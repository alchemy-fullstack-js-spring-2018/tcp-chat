TCP Chat Server
===

Create a TCP Chat server that allows clients to connect and chat.

## Basic Requirements

When the user connects to the chat room, there are 3 commands they can run:

1. The first command they can run is the `@all` command. When you write `@all`, you can add the text you want 
the channel to see, and it will show all users your message. An example of sending a message globally to the 
whole channel would be `@all hello world!`. This would return the message hello world for everyone to see.

2. The second command they can run is the `@nick` command. When you first connect to the chat room, you will be 
assigned a random number for your username, for example `user1`. You can alter this by running `@nick:username`, where username is the new choosen username. An example of changing a user named user123 to exampleuser would simply be `@nick:exampleuser`. 
When you change your nickname, the channel is notified of the name change.

3. The final command the user can run is the `@dm` command. By typing in `@dm:username`, 
where username is the person they are trying to direct message, and then the message itself, you can directly message a specific user without having it display 
globally to the channel. A written example to reach a user named exampleuser would be 
`@dm:exampleuser Hello this is a direct message!`.

When a user exits the chat room, the channel will be informed that your username has logged out. 

If that user reconnects, they would again be randomly assigned a username with a number.

## Implementation Guidelines

In order to track users by name, change name and get client sockets to message, create a `ChatRoom` class that wraps (has a property for) a JavaScript `Map` instance. You would initialize (create a new Map) in the constructor of your ChatRoom class.

Note that the **ChatRoom is synchronous**. The ChatRoom has the following methods:

* `add(client)` - takes a socket and returns the randomly (or sequentially :) generated user name.
* `getClient(username)` =  returns the socket that corresponds to the supplied user name.
* `all()` return all of the client sockets in the chat room

## Tests

### ChatRoom

A class that tracks clients (users) in the chat room

1. Test that a ChatRoom instance 'takes a socket, assigns random user name, and stores by user name'. Do this by
    * creating a new ChatRoom 
    * call `.add(client)` (note you can pass in a "mock", a plain empty object. Doesn't have to be a socket instance)
    * assert that a name was returned as the username (e.g. `assert.equal(client.username, username);`)
    * assert that the name was assigned as a property to the client object
    * call `.getClient(username)` passing in the username returned from the `.add` call, and assert that the returned object is the same as what you supplied to the `.add` call.
2. Test that a ChatRoom instance 'renames a user'
    * Create a new ChatRoom and add a user as above
    * Call `.rename(username, newusername)`
    * asset that the call to `.rename` return `true`
    * assert that using the old username does not return the client
    * assert that using the new username **does** return the client
    * assert that the `client.username` is now equal to the new username
3. Add a Test that 'can not rename to existing user name'. Should not throw an error, just not do the requested operation
    * Create a new ChatRoom and add two users
    * Call `.rename(username1, username2)`
    * assert that return value from `.rename` is `false`
    * assert that username1 and username2 return their original client objects
4. Test that calling `.all()` on the chat room returns an array of all clients (hint: Use the following to get all values from a map (assuming store as `this.clients`): `return [...this.clients.values()];`)

### parseMessage

A synchronous function that takes a string message and returns a command object (what is the command and any parameters) based on the contents of the message.

1. Test that it 'ignores strings that do not start with @'
    * Test that `null` is returned when passed a string that does not start with "@"
2. Test that a string like `'@cmd:param some text'` returns an object like:
    ```js
    { 
        command: 'cmd',
        arg: 'param',
        text: 'some text'
    }
    ```

### chatServer

A function that takes a port number and returns the tcp server. It does not start the server
(call `.listen`. This will be done in `server.js` in root of project, and in `before` of tests.

The function needs to:
* Create a ChatRoom instance to manage chat users
* Calling `net.createServer` to create the server and listen for events
* Properly orchestrate connected clients.

This will be tested "end-to-end", meaning an actual server will be tested using actual clients.

1. Create a server and listen using the `before`, `close` the server using an `after`



