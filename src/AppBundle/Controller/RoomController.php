<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Room;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Room controller.
 *
 * @Route("room")
 */
class RoomController extends Controller
{
    /**
     * Lists all room entities.
     *
     * @Route("/", name="room_index")
     * @Method("GET")
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $rooms = $em->getRepository('AppBundle:Room')->findAll();

        return $this->render('room/index.html.twig', array(
            'rooms' => $rooms,
        ));
    }

    /**
     * Creates a new room entity.
     *
     * @Route("/new", name="room_new")
     * @Method({"GET", "POST"})
     */
    public function newAction(Request $request)
    {
        $room = new Room();
        $form = $this->createForm('AppBundle\Form\RoomType', $room);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($room);
            $em->flush();

            return $this->redirectToRoute('room_show', array('id' => $room->getId()));
        }

        return $this->render('room/new.html.twig', array(
            'room' => $room,
            'form' => $form->createView(),
        ));
    }

    /**
     * Finds and displays a room entity.
     *
     * @Route("/{id}", name="room_show")
     * @Method("GET")
     */
    public function showAction(Room $room)
    {
        $deleteForm = $this->createDeleteForm($room);

        return $this->render('room/show.html.twig', array(
            'room' => $room,
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Displays a form to edit an existing room entity.
     *
     * @Route("/{id}/edit", name="room_edit")
     * @Method({"GET", "POST"})
     */
    public function editAction(Request $request, Room $room)
    {
        $deleteForm = $this->createDeleteForm($room);
        $editForm = $this->createForm('AppBundle\Form\RoomType', $room);
        $editForm->handleRequest($request);

        if ($editForm->isSubmitted() && $editForm->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('room_edit', array('id' => $room->getId()));
        }

        return $this->render('room/edit.html.twig', array(
            'room' => $room,
            'edit_form' => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Deletes a room entity.
     *
     * @Route("/{id}", name="room_delete")
     * @Method("DELETE")
     */
    public function deleteAction(Request $request, Room $room)
    {
        $form = $this->createDeleteForm($room);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($room);
            $em->flush();
        }

        return $this->redirectToRoute('room_index');
    }

    /**
     * @param Request $request
     * @param \AppBundle\Entity\RoomCategory $roomCategory
     * @param string $roomName
     * @Route("/newroom/{catid}/{roomName}", name="newroom-id")
     * @ParamConverter("roomCategory", options={"mapping":{"catid":"id"}})
     * @Method({"GET", "POST"})
     */
    public function autoNew(Request $request, \AppBundle\Entity\RoomCategory $roomCategory, $roomName)
    {
        $em = $this->getDoctrine()->getManager();
        if ($request->isXmlHttpRequest()) {
            $room = new Room();
            $room->setName($roomName)->setCategory($roomCategory);
            $em->persist($room);
            $em->flush();

            return $this->redirectToRoute('homepage');
        }
    }

    /**
     * @param Request $request
     * @param \AppBundle\Entity\Room $room
     * @Route("/printitems/{id}", name="showItemsInRoom")
     * @Method({"GET", "POST"})
     */
    public function printItems(Request $request, Room $room)
    {
        return $this->render('room/items_in_room.html.twig', [
            'itemType' => $room,
        ]);
    }

    /**
     * Creates a form to delete a room entity.
     *
     * @param Room $room The room entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm(Room $room)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('room_delete', array('id' => $room->getId())))
            ->setMethod('DELETE')
            ->getForm();
    }
}
