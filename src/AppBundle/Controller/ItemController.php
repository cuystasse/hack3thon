<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Item;
use AppBundle\Entity\Room;
use AppBundle\Form\ItemType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Item controller.
 *
 * @Route("item")
 */
class ItemController extends Controller
{
    /**
     * Lists all item entities.
     *
     * @Route("/", name="item_index")
     * @Method("GET")
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $items = $em->getRepository('AppBundle:Item')->findAll();

        return $this->render('item/index.html.twig', array(
            'items' => $items,
        ));
    }

    /**
     * Creates a new item entity.
     *
     * @Route("/new", name="item_new")
     * @Method({"GET", "POST"})
     */
    public function newAction(Request $request)
    {
        $item = new Item();
        $form = $this->createForm('AppBundle\Form\ItemType', $item);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($item);
            $em->flush();

            return $this->redirectToRoute('item_show', array('id' => $item->getId()));
        }

        return $this->render('item/new.html.twig', array(
            'item' => $item,
            'form' => $form->createView(),
        ));
    }

    /**
     * Finds and displays a item entity.
     *
     * @Route("/{id}", name="item_show")
     * @Method("GET")
     */
    public function showAction(Item $item)
    {
        $deleteForm = $this->createDeleteForm($item);

        return $this->render('item/show.html.twig', array(
            'item' => $item,
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Displays a form to edit an existing item entity.
     *
     * @Route("/{id}/edit", name="item_edit")
     * @Method({"GET", "POST"})
     */
    public function editAction(Request $request, Item $item)
    {
        $deleteForm = $this->createDeleteForm($item);
        $editForm = $this->createForm('AppBundle\Form\ItemType', $item);
        $editForm->handleRequest($request);

        if ($editForm->isSubmitted() && $editForm->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('item_edit', array('id' => $item->getId()));
        }

        return $this->render('item/edit.html.twig', array(
            'item' => $item,
            'edit_form' => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Deletes a item entity.
     *
     * @Route("/{id}", name="item_delete")
     * @Method("DELETE")
     */
    public function deleteAction(Request $request, Item $item)
    {
        $form = $this->createDeleteForm($item);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($item);
            $em->flush();
        }

        return $this->redirectToRoute('item_index');
    }

    /**
     * @param Request $request
     * @param \AppBundle\Entity\ItemType $itemType
     * @Route("/newitem/{itemtype_id}/{room_id}", name="newitem-id")
     * @ParamConverter("itemType", options={"mapping":{"itemtype_id":"id"}})
     * @ParamConverter("room", options={"mapping":{"room_id":"id"}})
     * @Method({"GET", "POST"})
     */
    public function autoNew(Request $request,\AppBundle\Entity\ItemType $itemType, Room $room)
    {
        $em = $this->getDoctrine()->getManager();
        if ($request->isXmlHttpRequest()) {

            $item = $em->getRepository('AppBundle:Item')->findOneBy(['itemType'=>$itemType, 'room'=>$room]);
            if ($item) {
                $item->setQuantity($item->getQuantity()+1);
            } else {
                $item = new Item();
                $item->setItemType($itemType);
                $item->setRoom($room);
                $item->setQuantity(1);
                $em->persist($item);
            }
            $em->flush();

            return $this->redirectToRoute('homepage');
        }
    }

    /**
     * @param Request $request
     * @param Item $item
     * @Route("/deleteItem/{id}", name="deleteitem-id")
     * @Method({"GET", "POST"}))
     */
    public function autoDelete(Request $request, \AppBundle\Entity\Item $item)
    {
        $em = $this->getDoctrine()->getManager();
        if ($request->isXmlHttpRequest()) {
            $oldItem = $item->getRoom();
            $em->remove($item);
            $em->flush();
            $items = $em->getRepository(\AppBundle\Entity\Item::class)->findByRoom($oldItem);
            return new Response('toto');
        }
    }

    /**
     * Creates a form to delete a item entity.
     *
     * @param Item $item The item entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm(Item $item)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('item_delete', array('id' => $item->getId())))
            ->setMethod('DELETE')
            ->getForm()
        ;
    }
}
