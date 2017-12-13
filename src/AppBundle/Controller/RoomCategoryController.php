<?php

namespace AppBundle\Controller;

use AppBundle\Entity\RoomCategory;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;use Symfony\Component\HttpFoundation\Request;

/**
 * Roomcategory controller.
 *
 * @Route("roomcategory")
 */
class RoomCategoryController extends Controller
{
    /**
     * Lists all roomCategory entities.
     *
     * @Route("/", name="roomcategory_index")
     * @Method("GET")
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $roomCategories = $em->getRepository('AppBundle:RoomCategory')->findAll();

        return $this->render('roomcategory/index.html.twig', array(
            'roomCategories' => $roomCategories,
        ));
    }

    /**
     * Creates a new roomCategory entity.
     *
     * @Route("/new", name="roomcategory_new")
     * @Method({"GET", "POST"})
     */
    public function newAction(Request $request)
    {
        $roomCategory = new Roomcategory();
        $form = $this->createForm('AppBundle\Form\RoomCategoryType', $roomCategory);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($roomCategory);
            $em->flush();

            return $this->redirectToRoute('roomcategory_show', array('id' => $roomCategory->getId()));
        }

        return $this->render('roomcategory/new.html.twig', array(
            'roomCategory' => $roomCategory,
            'form' => $form->createView(),
        ));
    }

    /**
     * Finds and displays a roomCategory entity.
     *
     * @Route("/{id}", name="roomcategory_show")
     * @Method("GET")
     */
    public function showAction(RoomCategory $roomCategory)
    {
        $deleteForm = $this->createDeleteForm($roomCategory);

        return $this->render('roomcategory/show.html.twig', array(
            'roomCategory' => $roomCategory,
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Displays a form to edit an existing roomCategory entity.
     *
     * @Route("/{id}/edit", name="roomcategory_edit")
     * @Method({"GET", "POST"})
     */
    public function editAction(Request $request, RoomCategory $roomCategory)
    {
        $deleteForm = $this->createDeleteForm($roomCategory);
        $editForm = $this->createForm('AppBundle\Form\RoomCategoryType', $roomCategory);
        $editForm->handleRequest($request);

        if ($editForm->isSubmitted() && $editForm->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('roomcategory_edit', array('id' => $roomCategory->getId()));
        }

        return $this->render('roomcategory/edit.html.twig', array(
            'roomCategory' => $roomCategory,
            'edit_form' => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Deletes a roomCategory entity.
     *
     * @Route("/{id}", name="roomcategory_delete")
     * @Method("DELETE")
     */
    public function deleteAction(Request $request, RoomCategory $roomCategory)
    {
        $form = $this->createDeleteForm($roomCategory);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($roomCategory);
            $em->flush();
        }

        return $this->redirectToRoute('roomcategory_index');
    }

    /**
     * Creates a form to delete a roomCategory entity.
     *
     * @param RoomCategory $roomCategory The roomCategory entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm(RoomCategory $roomCategory)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('roomcategory_delete', array('id' => $roomCategory->getId())))
            ->setMethod('DELETE')
            ->getForm()
        ;
    }
}
