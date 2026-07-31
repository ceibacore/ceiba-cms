#!/bin/bash
# Run PHPUnit tests

# Load environment variables from .env.test
if [ -f .env.test ]; then
    export $(cat .env.test | grep -v '^#' | xargs)
fi

# Run tests
php vendor/bin/phpunit "$@"
