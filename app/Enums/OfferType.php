<?php

namespace App\Enums;

enum OfferType: string
{
    case Stage = 'stage';
    case Emploi = 'emploi';
    case Alternance = 'alternance';

    public function label(): string
    {
        return match ($this) {
            self::Stage => 'Internship',
            self::Emploi => 'Job',
            self::Alternance => 'Apprenticeship',
        };
    }

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
