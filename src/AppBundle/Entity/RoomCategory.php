<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * RoomCategory
 *
 * @ORM\Table(name="room_category")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\RoomCategoryRepository")
 */
class RoomCategory
{
    /**
     * @var
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\ItemType", mappedBy="roomCategorys")
     */
    private $itemTypes;

    /**
     * @var
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\Room",mappedBy="category")
     */
    private $rooms;

    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255)
     */
    private $name;


    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name
     *
     * @param string $name
     *
     * @return RoomCategory
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->rooms = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Add room
     *
     * @param \AppBundle\Entity\Room $room
     *
     * @return RoomCategory
     */
    public function addRoom(\AppBundle\Entity\Room $room)
    {
        $this->rooms[] = $room;

        return $this;
    }

    /**
     * Remove room
     *
     * @param \AppBundle\Entity\Room $room
     */
    public function removeRoom(\AppBundle\Entity\Room $room)
    {
        $this->rooms->removeElement($room);
    }

    /**
     * Get rooms
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getRooms()
    {
        return $this->rooms;
    }

    /**
     * Add itemType
     *
     * @param \AppBundle\Entity\ItemType $itemType
     *
     * @return RoomCategory
     */
    public function addItemType(\AppBundle\Entity\ItemType $itemType)
    {
        $this->itemTypes[] = $itemType;

        return $this;
    }

    /**
     * Remove itemType
     *
     * @param \AppBundle\Entity\ItemType $itemType
     */
    public function removeItemType(\AppBundle\Entity\ItemType $itemType)
    {
        $this->itemTypes->removeElement($itemType);
    }

    /**
     * Get itemTypes
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getItemTypes()
    {
        return $this->itemTypes;
    }
}
