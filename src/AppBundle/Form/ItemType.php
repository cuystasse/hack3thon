<?php

namespace AppBundle\Form;

use AppBundle\Entity\Room;
use AppBundle\Entity\RoomCategory;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ItemType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('name')->add('height')->add('width')->add('depth')->add('volume')->add('itemType', EntityType::class, [
            "class" => \AppBundle\Entity\ItemType::class,
            "choice_label" => "getName",
        ])->add('room', EntityType::class, [
            "class" => Room::class,
            "choice_label" => "getName",
        ]);
    }
    
    /**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'AppBundle\Entity\Item'
        ));
    }

    /**
     * {@inheritdoc}
     */
    public function getBlockPrefix()
    {
        return 'appbundle_item';
    }


}
