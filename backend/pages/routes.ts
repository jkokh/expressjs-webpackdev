import { Server } from "../server/server";

let routes = [
    'home/home.route.js',
    'about/about.route.js',
    'contacts/contacts.route.js',
    'signup/signup.route.js',
    'login/login.route.js'
];

export default (server: Server) => {
    routes.forEach((route: string) => require(`${__dirname}/../pages/` + route).default(server));
}
