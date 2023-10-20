---
title: "How I Built and Deployed My Blog Within 90 Minutes Using the TMNT Stack"
excerpt: "Luckily, NextJS had already built the exact solution I was looking for as an example. Within about 90 minutes, I was able to have this blog customized a bit to my liking and deployed on Vercel. It uses 4 tools that I have a lot of interest in so I am happy to dive into this technology cocktail. With TypeScript, Markdown, NextJS, and Tailwind we have what I like to call the TMNT stack or the ninja turtle stack (I did a quick google search and I think I am the first to coin this term!)."
coverImage: "/assets/blog/hello-world/TMNTStack.png"
date: "2023-10-15"
author:
  name: Cade Gray
  picture: "/assets/blog/authors/joe.jpeg"
ogImage:
  url: "/assets/blog/hello-world/TMNTStack.png"
---

### Why this blog?

After taking a hiatus from developing as a hobby due work and life taking up so much time, I am finally back in a really good groove of developing.
It started with my wedding website that I created using Svelte. An API was also needed to post RSVP data to a mysql database so I then built that out. Then my fiance needed a way to view all the guests that had RSVP'd, so I built an admin site to be able to view that.
With all these projects being done, I wanted a way to journal this progress to feel like I am accomplishing things. So once again, another project was born! This would be the blog you are reading now.
I wanted the blog posts to be able to be written in Markdown files stored in a folder, for easy readability, writability, and storage, which would then be rendered to HTML pages for each file. Luckily, NextJS had already built the exact solution I was looking for as an example. Within about 90 minutes, I was able to have this blog customized a bit to my liking and deployed on Vercel. It uses 4 tools that I have a lot of interest in so I am happy to dive into this technology cocktail. With TypeScript, Markdown, NextJS, and Tailwind we have what I like to call the TMNT stack or the ninja turtle stack (I did a quick google search and I think I am the first to coin this term!).

### Using NextJS

NextJS is a framework I have been wanting to pick up for some time now but have not found the need for it yet, but the time has finally come and I think it has been a good experience so far.
It is used for building full stack applications that are typically server-side rendered (SSR). Essentially, when a page is requested like https://blog.cadegray.dev/posts/hello-world, under the hood, a call is being made to an API route `/posts/$slug`, $slug being the requested post, which is returning HTML that has been rendered from markdown. Within a folder, lives a `hello-world.MD` file that represents the blog post data.

### TypeScript and Tailwind

There are two, what I would consider tools (even though they are more like a language and library), that I think are perfect for improving productivity. The first tool is TypeScript, which gives JavaScript the ability to have types. Coming from learning development with Java, I worked with types, but did not appreciate them completely, especially when moving to JavaScript which is the wild west. Once I started working on my Admin Site and especially this site, it finally clicked with me how it could be useful. The strictness of it keeps my code much cleaner and prevents unused imports from staying in my project.
The second tool is Tailwind CSS. The more I use it, the more I fall in love with it and never want to go back to raw CSS. I have spent way too much time writing CSS compared to other languages due to wanting things to look just right in my eyes, and it can get very messy, very quick.
With TailWind, I am able to write my CSS faster than ever since it's done within the HTML elements Class (or Classname if in JSX) using predefined class names. For example, to style this white container that is housing the blog post, classes were applied to the following JSX element as shown:

`<article className="bg-slate-50 p-3 rounded-lg m-3">`

By applying these class names, you are able to provide a background, apply padding and margin, and round the corners. Doing this makes you move much quicker since you are not needing to switch to a separate file to write your CSS.

### Using Markdown to Write this post

Now for my favorite feature, being able to write my posts in Markdown. This is much easier than having to write the equivalent in HTML. All that needs to be done is adding a new MD file to a directory and you have yourself a new blog post that can be accessed by it’s filename. One example use, that I have actually been using in this post, is being able to write code snippets that renders to `<code>` html elements by wrapping in backticks:

\`var a = "hello"\`

`var a = "hello"`

### Hosting

For hosting, I normally will place my sites and applications on my personal Digital Ocean droplet. However, since I used NextJS, I wanted to get the full Vercel experience (they are the creators of NextJS) so I decided to use their hosting solution. The process of deploying modern web apps to Vercel is hands down one of the best experiences I think you can have with deploying an application. Being able to automatically deploy from your main/master branch on GitHub is such a nice experience since it automates the build and deploys for you. With this blog, I was able to have it built and deployed to Vercel all within 90 minutes, even with some mistakes along the way.

### Takeaways

I am very happy with how building this blog has been going. The developer experience you get from Typescript and Tailwind is something I have never appreciated until now. With NextJS, I am enjoying my experience with it so far and I hope to continue to expand upon it so I can learn more about SSR and other concepts such as Hydration. This will be the first of many blog posts I will write to journal my journey in learning for myself and for others to read if they want.
