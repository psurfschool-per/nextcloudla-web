# NextCloud LA - Página Web Moderna

Página web moderna, elegante y completa para NextCloud LA - Soluciones Digitales.

## Características

- Diseño 100% responsive
- Animaciones suaves (AOS)
- Slider de imágenes automático
- Formulario de contacto funcional
- Filtros de portafolio
- Testimonios interactivos
- Estadísticas animadas
- Optimización SEO

## Estructura

```
nextcloudla-web/
├── index.html      # Archivo principal HTML
├── styles.css      # Estilos CSS modernos
├── script.js       # JavaScript interactivo
└── README.md       # Esta documentación
```

## Tecnologías Utilizadas

- HTML5
- CSS3 (Variables CSS, Grid, Flexbox)
- JavaScript ES6+
- Bootstrap Icons
- AOS (Animate On Scroll)
- Google Fonts (Inter, Poppins)

## Personalización

### Colores
Los colores se pueden modificar en las variables CSS al inicio de `styles.css`:

```css
:root {
    --primary: #03b0de;        /* Color primario */
    --primary-dark: #0295ba;   /* Color primario oscuro */
    --dark: #111827;           /* Color oscuro */
    --gray: #6b7280;           /* Color gris */
    --light: #f9fafb;          /* Color claro */
}
```

### Imágenes
Las imágenes se cargan desde el servidor de NextCloud LA. Para usar imágenes locales, reemplaza las URLs en el HTML.

## Funcionalidades

1. **Navegación fija** con efecto de transparencia al hacer scroll
2. **Menú móvil** responsive con animación
3. **Slider automático** con indicadores personalizados
4. **Contadores animados** en la sección de estadísticas
5. **Filtros de portfolio** con transiciones suaves
6. **Formulario de contacto** con validación y notificaciones
7. **Botón "Volver arriba"** que aparece al hacer scroll
8. **Loader de carga** al iniciar la página

## Cómo Usar

1. Abre el archivo `index.html` en tu navegador
2. O ejecuta un servidor local:
   ```bash
   # Python
   python -m http.server 8000
   
   # Node.js
   npx serve
   ```

## Créditos

- Imágenes: NextCloud LA
- Iconos: Bootstrap Icons
- Animaciones: AOS Library
- Fuentes: Google Fonts

## Licencia

© 2024 NextCloud SAC - Todos los derechos reservados