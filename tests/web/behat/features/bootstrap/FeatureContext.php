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
}
