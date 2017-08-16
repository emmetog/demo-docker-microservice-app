<?php

use Behat\MinkExtension\Context\MinkContext;

class FeatureContext extends MinkContext {

    /**
     * @Then /^wait (\d+) seconds?$/
     */
    public function wait($seconds)
    {
        sleep($seconds);
    }

    /**
     * @Given /^I wait for css element "([^"]+)" to (appear|disappear)$/
     */
    public function iWaitForCssElement($element, $appear)
    {
        $xpath = $this->getSession()->getSelectorsHandler()->selectorToXpath('css', $element);
        $this->waitForXpath($xpath, $appear == 'appear');
    }

    private function waitForXpath($xpath, $appear)
    {
        $this->waitFor(function($context) use ($xpath, $appear) {
            $visible = $context->getSession()->getDriver()->isVisible($xpath);
            return $appear ? $visible : !$visible;
        });
    }

    /**
     * @Given /^I wait for text "([^"]+)" to appear$/
     */
    public function iWaitForTextToAppear($text)
    {
        var_dump( $this->getSession()->evaluateScript('document.documentElement.innerHTML') ); die;
        var_dump( $this->getSession()->getDriver()->getContent() ); die;

        $this->waitFor(function ($context) use ($text) {
            return strpos($context->getSession()->getPage()->getContent(), $text) !== false;
        });
    }

    private function waitFor($fn, $timeout = 5000)
    {
        $start = microtime(true);
        $end = $start + $timeout / 1000.0;
        while (microtime(true) < $end) {
            if ($fn($this)) {
                return;
            }
            sleep(0.5);
        }
        throw new \Exception("waitFor timed out");
    }

//    /**
//     * @When /^I wait for all ajax to load$/
//     */
//    public function waitForAjax()
//    {
//        $waitTime = 10000;
//        try {
//            //Wait for Angular
//            $angularIsNotUndefined = $this->getSession()->evaluateScript("return (typeof angular != 'undefined')");
//            if ($angularIsNotUndefined) {
//                //If you run the below code on a page ending in #, the page reloads.
//                if (substr($this->getSession()->getCurrentUrl(), -1) !== '#') {
//                    $angular = 'angular.getTestability(document.body).whenStable(function() {
//                window.__testable = true;
//            })';
//                    $this->getSession()->evaluateScript($angular);
//                    $this->getSession()->wait($waitTime, 'window.__testable == true');
//                }
//
//                /*
//                 * Angular JS AJAX can't be detected overall like in jQuery,
//                 * but we can check if any of the html elements are marked as showing up when ajax is running,
//                 * then wait for them to disappear.
//                 */
//                $ajaxRunningXPath = "//*[@ng-if='ajax_running']";
//                $this->waitForElementToDisappear($ajaxRunningXPath, $waitTime);
//            }
//
//            //Wait for jQuery
//            if ($this->getSession()->evaluateScript("return (typeof jQuery != 'undefined')")) {
//                $this->getSession()->wait($waitTime, '(0 === jQuery.active && 0 === jQuery(\':animated\').length)');
//            }
//        } catch (Exception $e) {
//            var_dump($e->getMessage()); //Debug here.
//        }
//    }
}