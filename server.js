import { createServer, Model, Response } from "miragejs"


createServer({
    models: {
        vans: Model,
        users: Model
    },

    seeds(server) {
        
        server.create("user", { id: "123", email: "test@mail.com", password: "p12345", name: "Bob" })
    },

    routes() {
        this.namespace = "api"
        this.logging = false
        this.timing = 1000
        this.passthrough("https://firestore.googleapis.com/**")

        this.get("/vans", (schema, request) => {
            // return new Response(400, {}, {error: "Error fetching data"})
            return schema.vans.all()
        })

        this.get("/vans/:id", (schema, request) => {
            const id = request.params.id
            return schema.vans.find(id)
        })

        this.get("/host/vans", (schema, request) => {
            // Hard-code the hostId for now
            return schema.vans.where({ hostId: "123" })
        })

        this.get("/host/vans/:id", (schema, request) => {
            // Hard-code the hostId for now
            const id = request.params.id
            return schema.vans.findBy({ id, hostId: "123" })
        })

        this.post("/login", (schema, request) => {
            const { email, password } = JSON.parse(request.requestBody)
            // Extremely naive version of authentication.
            const foundUser = schema.users.findBy({ email, password })
            if (!foundUser) {
                return new Response(401, {}, { message: "No user with those credentials found!" })
            }

            // fake password back to client
            foundUser.password = undefined
            return {
                user: foundUser,
                token: "Enjoy your pizza, here's your tokens."
            }
        })
    }
})
