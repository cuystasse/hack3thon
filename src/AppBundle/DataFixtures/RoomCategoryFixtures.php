<?php
/**
 * Created by PhpStorm.
 * User: wilder8
 * Date: 13/12/17
 * Time: 17:11
 */

namespace AppBundle\DataFixtures;

use AppBundle\Entity\RoomCategory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class RoomCategoryFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $tab = [
            'Cuisine',
            'Salon',
            'Chambre',
            'Salle de bain',
            'Garage',
        ];

        foreach ($tab as $name) {
            $roomCat = new RoomCategory();
            $roomCat->setName($name);

            $manager->persist($roomCat);
        }

        $manager->flush();
    }
}