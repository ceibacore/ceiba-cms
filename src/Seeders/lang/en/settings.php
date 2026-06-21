<?php

declare(strict_types=1);

return [
    'appearance' => [
        'title' => 'Appearance settings',
        'description' => 'Update your account\'s appearance settings',
    ],
    'profile' => [
        'title' => 'Profile settings',
        'section_title' => 'Profile information',
        'section_description' => 'Update your name and email address',
        'name' => 'Name',
        'name_placeholder' => 'Full name',
        'email' => 'Email address',
        'email_placeholder' => 'Email address',
        'unverified_email' => 'Your email address is unverified.',
        'resend_verification' => 'Click here to resend the verification email.',
        'verification_sent' => 'A new verification link has been sent to your email address.',
        'save' => 'Save',
    ],
    'security' => [
        'title' => 'Security settings',
        'password_section_title' => 'Update password',
        'password_section_desc' => 'Ensure your account is using a long, random password to stay secure',
        'current_password' => 'Current password',
        'current_password_ph' => 'Current password',
        'new_password' => 'New password',
        'new_password_ph' => 'New password',
        'confirm_password' => 'Confirm password',
        'confirm_password_ph' => 'Confirm password',
        'save_password' => 'Save password',
        '2fa_section_title' => 'Two-factor authentication',
        '2fa_section_desc' => 'Manage your two-factor authentication settings',
        '2fa_enable_description' => 'When you enable two-factor authentication, you will be prompted for a secure pin during login. This pin can be retrieved from a TOTP-supported application on your phone.',
        '2fa_enabled_description' => 'You will be prompted for a secure, random pin during login, which you can retrieve from the TOTP-supported application on your phone.',
        'continue_setup' => 'Continue setup',
        'enable_2fa' => 'Enable 2FA',
        'disable_2fa' => 'Disable 2FA',
    ],
];
