<?php

/*
 * This file is part of luuhai48/oauth-google.
 *
 * Copyright (c) 2020 Luuhai48.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace Luuhai48\OauthGoogle\Providers;

use FoF\OAuth\Provider;
use Flarum\Forum\Auth\Registration;
use Flarum\Settings\SettingsRepositoryInterface;
use League\OAuth2\Client\Provider\AbstractProvider;
use League\OAuth2\Client\Provider\Google as GoogleProvider;

class Google extends Provider
{
    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;

    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }

    /**
     * @var GoogleProvider
     */
    protected $provider;

    public function name(): string
    {
        return 'google';
    }

    public function link(): string
    {
        return 'https://console.developers.google.com/apis/credentials';
    }

    public function fields(): array
    {
        return [
            'client_id'     => 'required',
            'client_secret' => 'required',
        ];
    }

    public function provider(string $redirectUri): AbstractProvider
    {
        return $this->provider = new GoogleProvider([
            'clientId'     => $this->getSetting('client_id'),
            'clientSecret' => $this->getSetting('client_secret'),
            'redirectUri'  => $redirectUri,
            'approvalPrompt'  => 'force',
            'hostedDomain'    => null,
            'accessType'      => 'offline',
        ]);
    }

    public function suggestions(Registration $registration, $user, string $token)
    {
        $email = $user->getEmail();

        $registration
            ->provideTrustedEmail($email)
            ->suggestUsername($user->getName())
            ->provideAvatar($user->getAvatar())
            ->setPayload($user->toArray());
    }
}
