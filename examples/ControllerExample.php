<?php

namespace App\Controller;

use App\Entity\User;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\View\View;
//..
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\Request;

/** @Rest\Route("/api/security") */
class ControllerExample extends FOSRestController
{
    /**
     * @Rest\View()
     * @Rest\Post("/register", name="register")
     * @return View|FormInterface
     */
    public function register(Request $request, UserManagerInterface $userManager)
    {
        $user = $this->getUser();
        $form = $this->get('form.factory')
            ->createNamedBuilder('register', FormType::class, $user)
            ->add('username', TextType::class, ['required' => true])
            ->add('password', RepeatedType::class, [
                'type' => PasswordType::class,
                'required' => true
            ])
            ->getForm();

        $form->submit(
            $request->request->getIterator()->getArrayCopy()
        );

        if (!$form->isValid()) {
            return $this->view($form, 402);
        }

        $userManager->save($user);

        return $this->view(null, 200);
    }
}
