# Backend para "Delilah Restó"

Trabajo #3 del curso de Desarrollo Web Full Stack de Acámica.

El objetivo del trabajo es generar el backend de una app de pedidos de comida llamada Delilah Restó, generando la arquitectura, la base de datos MySQL para almacenar y administrar los datos de Resto, los endpoints funcionales y la documentación.

**Caracteristicas:**
- Registro de usuarios e inicio de sesión.
- Validación de roles (administrador o no)
- Funciones CRUD de productos
- Funciones CRUD de órdenes

## Tabla de contenidos
* [Recursos y tecnologías utilizadas](recursos-y-tecnologías-utilizadas)
* [Instalación](#instalación)


## Recursos y tecnologías utilizadas
- Node.js
- Express
- MySQL
- Swagger para documentación de API
- Postman para manejo de endpoints y testing

## Instalación

### 1- Clonar proyecto

Clonar el repositorio desde el [siguiente link](https://github.com/jsduana/DelilahResto-Acamica).

Desde la consola con el siguiente link:

`git clone git@github.com:jsduana/DelilahResto-Acamica.git`

### 2- Node.js
Este proyecto trabaja con Node.js, por ende, de no tenerlo instalado se lo debe instalar para el funcionamiento del proyecto. Se lo puede descargar e instalar en [https://nodejs.org/es/download/](https://nodejs.org/es/download/).  

### 3- Instalación de paquetes:
Las dependencias se instalan con el siguiente comando:
 
```bash
npm install
```  
  
-Asegurarse que todos los comandos sean hechos con la carpeta raíz del proyecto como current directory 

### 4- XAMPP:
El proyecto también requiere tener instalado XAMPP o algún otro sistema de gestión de base de datos MySQL. Se lo puede descargar e instalar en [https://www.apachefriends.org/es/index.html](https://www.apachefriends.org/es/index.html).  

En XAMPP se debe tener activado los módulos Apache y MySQL para poder realizar operaciones con la base de datos. De tener otro sistema realizar una acción equivalente.  
  
### 5- Configuración datos de conexión con la base de datos:  
Entrando al archivo **db_connection_data.js** dentro de **database** se pueden observar las siguientes variables para la configuración de la conexión:


```json
conf_db_name  : 'delilah_resto',  // database name
conf_user     : 'root',           // user name
conf_password : '',               // password
conf_port     : '3306',           // port number
```

Los valores de estas variables pueden ser modificados de ser necesario.

### 6- Instalación de base de datos:  
#### 6.0-Comando para crear la estructura de la base de datos y tablas: 

```bash
node app/db/0_db_structure.js
```  
-Tener en cuenta que si ya existe un base de datos llamada 'delilah_resto' (o cómo la haya renombreado en el paso 4) será eliminada en este paso  

#### 6.1-Comando para agregar usuarios: 

```bash
node app/db/1_db_admin.js
```  

#### 6.2-Comando para agregar productos: 

```bash
node app/db/2_db_products.js
```  

#### 6.3-Comando para agregar pedidos: 

```bash
node app/db/3_db_orders.js
```  

#### 6.4-Comando para agregar datos de los pedidos: 

```bash
node app/db/4_db_products_orders.js
```  

### 7 - Iniciando el servidor

Abrir el archivo en `/server/server.js` desde node

`node server`