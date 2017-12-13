<?php
/**
 * Created by PhpStorm.
 * User: wilder8
 * Date: 13/12/17
 * Time: 17:11
 */

namespace AppBundle\DataFixtures;

use AppBundle\Entity\ItemCategory;
use AppBundle\Entity\RoomCategory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class ItemCategoryFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $tab = [
            'Meubles',
            'Electroménager',
            'Cartons',
            'Instruments de musique',
        ];

        foreach ($tab as $name) {
            $itemCat = new ItemCategory();
            $itemCat->setName($name);

            $manager->persist($itemCat);
        }

        $manager->flush();
    }
}