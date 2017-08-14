<?php

use Behat\MinkExtension\Context\MinkContext;

class FeatureContext extends MinkContext {

    /**
     * @Given /^I debug$/
     */
    public function debug()
    {
//        var_dump($this->getMinkParameter('base_url'));
        $result = $this->getSession()->evaluateScript("$('input').val();");
        var_dump($result);
    }

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

    private function waitForXpathNode($xpath, $appear)
    {
        $this->waitFor(function($context) use ($xpath, $appear) {
            try {
                $nodes = $context->getSession()->getDriver()->find($xpath);
                if (count($nodes) > 0) {
                    $visible = $nodes[0]->isVisible();
                    return $appear ? $visible : !$visible;
                } else {
                    return !$appear;
                }
            } catch (WebDriver\Exception $e) {
                if ($e->getCode() == WebDriver\Exception::NO_SUCH_ELEMENT) {
                    return !$appear;
                }
                throw $e;
            }
        });
    }

    /**
     * @Given /^I wait for text "([^"]+)" to (appear|disappear)$/
     */
    public function iWaitForText($text, $appear)
    {
        $this->waitForXpathNode(".//*[contains(normalize-space(string(text())), \"$text\")]", $appear == 'appear');
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
}