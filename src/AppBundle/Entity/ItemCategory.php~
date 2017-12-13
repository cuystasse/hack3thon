<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * ItemCategory
 *
 * @ORM\Table(name="item_category")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\ItemCategoryRepository")
 */
class ItemCategory
{
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
    * @ORM\OneToMany (targetEntity="ItemType", mappedBy="itemCategory")
    *
    */
    private $itemTypes;

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
     * @return ItemCategory
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
        $this->itemTypes = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Add itemType
     *
     * @param \AppBundle\Entity\ItemType $itemType
     *
     * @return ItemCategory
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
