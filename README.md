# GASI

## Juan Mario Rojas

### **Backend**

Con el siguiente comando se inicializa el backend + database

```
cd app-area-curricular-backend
mvn clean package -DskipTests
cd ..
cd docker
docker compose up --build
```

### **Frontend**

Para realizar las pruebas en Cypress se recomienda la ejecucion local del frontend para mayor facilidad de ejecutar los comandos

```
cd app-area-curricular-frontend
npm install
npm run dev --host
```

### **Ejecutar pruebas en Cypress**

```
npx cypress open
```

##### Selecciona el tipo de testing

* En la ventana de Cypress, elige la opción "E2E Testing"
* Ejecutar el archivo: e2e_login_crear_participante_logout.cy.js
