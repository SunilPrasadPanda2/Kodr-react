# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


in this project i have used two assets folder because one is for the local work. i had all the connections build in /assets. but in server it was not working. 
so i had to create one more assets so that all of it is working after the build and later i changed the old references of the assets to public folder. 
But still so files like index.scss need the old assets. 
so there are two assets folder. 