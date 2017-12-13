<?php

namespace AppBundle\Repository;

/**
 * ItemTypeRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class ItemTypeRepository extends \Doctrine\ORM\EntityRepository
{
    public function getItemTypeLike($itemType, $room=null)
    {
        $itemType = "%" . $itemType . "%";

        $qb = $this->createQueryBuilder('it')
            ->select('it.name, it.id, icat.name icatName')
            ->join('it.itemCategory', 'icat')
            ->where('it.name LIKE :itemType')
//            ->andWhere('it.roomCat LIKE :town')
//            ->setParameter('country', $room)
            ->setParameter('itemType', $itemType)
            ->orderBy('icat.name', 'ASC')
            ->getQuery();
        return $qb->getResult();
    }
}
