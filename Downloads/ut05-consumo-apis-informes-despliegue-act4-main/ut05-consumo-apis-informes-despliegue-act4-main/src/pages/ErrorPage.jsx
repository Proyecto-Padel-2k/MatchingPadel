/**
 * El componente ErrorPage muestra un mensaje de error 404 indicando que la página solicitada no fue encontrada.
 *
 * @componente
 * @returns {JSX.Element} Una sección que contiene un mensaje de error.
 */
import React from 'react';


export default function ErrorPage() {
    // En caso de error le llevara a esta pagina
return (
<section>
    <h2>404 - Página no encontrada</h2>
    <p>Lo sentimos, la página que buscas no existe.</p>
</section>
);
}
