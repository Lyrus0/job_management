<?php

namespace App\Enums;

enum UserRole: string
{
    case Admin = 'admin';
    case Student = 'student';
    case Company = 'company';

    public function label(): string
    {
        return match ($this) {
            self::Admin => 'Administrator',
            self::Student => 'Student',
            self::Company => 'Company',
        };
    }

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
