Authentication for web applications has historically been fairly straightforward and followed a common pattern, but this has been changing significantly in recent years. There are several reasons for these changes, and the prominent ones are related to the way in which modern applications are built and distributed.

In this article, we'll explore how we can better handle authentication in modern applications by using JSON Web Tokens (JWT). The JWT standard is open source and offers a way for us to exchange claims between two parties. JWTs are used primarily for user authentication, but since they are digitally signed JSON objects and can contain arbitrary information that we specify, they give us the ability to do more than just authenticate users. For example, we can use JWTs to send information between two servers and--since JWTs are digitally signed--it can be done securely because we can verify the authenticity of the sender. When tokens are digitally signed, we are also guaranteed that their content has not been changed at all, giving us confidence in the authenticity of both the sender and the content.

## Traditional Web Applications

In a general sense, traditional websites and applications typically implement user authentication using **sessions** and **cookies**. When a user logs in to a site, his or her username and password are matched against database entries. If the login is successful, the server saves the user's authentication state in memory and sends a cookie back in the reponse that contains some data, which in most cases includes the user's ID. Browsers will save the cookie for the domain from which it came and then automatically send it back when subsequent requests are made. For example, if a cookie is saved with a domain of auth0.com, it will be sent back on any future request to auth0.com as long as it is valid. This works great for traditional web apps.

![modern authentication jwt](https://cdn.auth0.com/blog/legacy-app-auth/legacy-app-auth-1.png)

Even though we've labeled the process described above as being "traditional", it should be noted that *most* of the web still operates this way. While this approach is still perfectly valid for a lot of use cases, we're going to explore some of the reasons why relying on it has become challenging for modern web applications.

## Authentication Challenges for Modern Web Apps

Modern web applications present a few challenges for authentication that are difficult to solve using conventional methods. The reasons for this have to do with how applications are crafted and the environment in which applications reside.

### 1. Apps are distributed across many servers

Many of today's applications aren't deployed the same way they were in the past. It is now very common--and often necessary--for apps to be distributed across many servers so that up-time is increased and latency issues are mitigated. With this comes the side effect that, when a user accesses an application, it is no longer guaranteed that they are always accessing the same server.

Since traditional authentication relies on the server to keep the user's authentication state in memory, things break down when the app is accessed from different servers. The user might be logged in on one server but not on the others that the application is distributed across.

We can get around this by using methods like [**sticky sessions**](http://stackoverflow.com/questions/10494431/sticky-and-non-sticky-sessions). A sticky session will essentially route the user to the server instance from which they logged in so that the authentication state can be presevered. This type of workaround will do the job, but as we'll see, stateful servers in general don't play that well with modern applications.

### 2. Apps use APIs for data

A common pattern for modern applications, especially single-page apps, is to retrieve and consume JSON data from a [RESTful API](http://www.restapitutorial.com/). Serving data from an API has several distinct advantages, one of them being the ability for data to be used in more than just one application. For example, an organization might start with the intent to build an internally facing application, but may soon realize that some of its functionality could be used in a public-facing app. Down the road, the organization might also decide that some of its data should be accessible by other application developers to build third-party apps with. This can all be made possible with an API.

Using APIs in this fashion is great, but things can become challenging when it comes to authentication. The traditional approach of using sessions and cookies for the user's identity doesn't work so well in these cases because their use introduces **state** to the application. One of the tenets of a RESTful API is that it should be **stateless**, meaning that, when a request is made, a response within certain parameters can always be anticipated without side effects. A user's authentication state introduces such a side effect, which breaks this principle. Keeping the API stateless and therefore without side effect means that maintainability and debugging are made much easier.

Another challenge here is that it is quite common for an API to be served from one server and for the actual application to consume it from another. To make this happen, we need to enable [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS). Since cookies can only be used for the domain from which they originated, they aren't much help for APIs on different domains than the application.

### 3. Apps rely on downstream services

Another common pattern seen with modern web applications is that they often rely on downstream services. For example, a call to the main application server might make a request to a downstream server before the original request is resolved. The issue here is that cookies don't "flow" easily to the downstream servers and can't tell those servers about the user's authentication state. Since each server has its own scheme for cookies, there is a lot of resistance to flow, and connecting to them is difficult.

## A Modern Alternative: The JSON Web Token (JWT)

To combat the issues detailed above, we can take a token-based approach by using JSON Web Tokens (JWTs) for authentication. A JWT contains three parts:

**1. Header**

The header tells us about the algorithm and token type. It is Base64URL encoded.

**2. Payload**

The payload contains any arbitrary information in the form of claims that we as developers find useful for our applications. The user's ID must be sent as a `sub` claim, but we can also send other useful information, such as the username, email, and more. The payload is also Base64URL encoded.

**3. Signature**

The signature is used to verify the authenticity of the JWT. There are several different algorithms that can be used for the signature. Some algorithms implement a shared secret (HMAC), and others use public-private key secrets (RSA).

![modern authentication jwt](https://cdn.auth0.com/blog/legacy-app-auth/legacy-app-auth-5.png)

From the user's perspective, logging in to an application that uses JWTs looks much like traditional authentication. The user enters his or her credentials as usual, but instead of the server creating a session and returning a cookie, it will respond with a JSON object that contains a JWT. The JWT then needs to be saved locally, which is normally done with local storage. However, as we'll see in the next section, it is possible to save the JWT in a cookie.

The JWT must be sent to the server to access protected routes, and it is typically sent as an `Authorization` header. The scheme used for this header is `Bearer`, so the full header looks like this:

```js
Authorization: Bearer <token>
```

Middleware on the protected API routes will check for a valid JWT, and if there is one, it will let the request through and return the data being requested. Since the user's information is contained within the JWT itself, there is no need to look the user up in a database, so there is less latency in the application.

It should be reiterated that the user's state is never saved in memory on the server, meaning that the user isn't "logged in" in the conventional sense. However, a valid JWT gives the user the keys to access data each time a request is made, and in this way, a stateless authentication mechanism is in place.

![](https://cdn.auth0.com/blog/legacy-app-auth/legacy-app-auth-2.png)

Using a JWT for authentication helps to solve the challenges noted above. We can fully rely on data APIs that are stateless and even make requests to downstream services. Since JWT is a specification [implemented nearly everywhere](http://jwt.io), connecting to downstream services built on a stack other than our own is easy. It also doesn't matter which domain is serving our API, nor does it matter which specific server a request goes to if the app is deployed across many.

JWT authentication can be [done with cookies](https://auth0.com/blog/2015/09/28/5-steps-to-add-modern-authentication-to-legacy-apps-using-jwts/), which can be useful in situations where applications can't fully move away from using them.