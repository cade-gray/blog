---
title: "Migrating From a Managed Database Solution to Self Hosting on a Virtual Private Server"
excerpt: "When developing projects, there comes times where you have to make choices on technology and sometimes that choice is not the best for the long term. In this blog post, I will explain how I started utilizing a managed database solution and how their business decision put me in a position to have to act quickly on either paying $40 dollars a month for some hobby projects or move my database to a new home. I will give a brief overview on how I stood up a new MySQL instance on a server, migrated the schema and data, and then repointed my API utilizing the database."
coverImage: "/assets/blog/db-migration/db-migration.png"
postDate: "2024-04-07"
lastUpdated: "2024-04-07"
ogImage:
  url: "/assets/blog/db-migration/db-migration.png"
---

### Introduction

When developing projects, there comes times where you have to make choices on technology and sometimes that choice is not the best for the long term even though you would think it would be. In this blog post, I will explain how I started utilizing a hosted database solution's hobby plan and how their business decision put me in a position to have to act quickly on either paying $40 dollars a month for some hobby projects or move my database to a new home. I will give a brief overview on how I stood up a new MySQL instance on a server, migrated the schema and data, and then repointed my API utilizing the database. Many lessons were learned from this adventure.

### How It started

This all started when I was working on my wedding website and one of the requirements was taking in form submissions and storing the data within a database. I was in a rush so at the time I wanted something quick and easy, which led me to the hosted solution, PlanetScale. It's hobby plan had a generous limit of 1 billion row reads and 10 million row writes a month. However, the company decided it needed to be more profitable for them to have a better future. Because of that, they made the decision to retire the hobby tier and gave users a little over 1 month to either upgrade to their Scaler Pro plan, which is a whopping $40 dollars a month, or migrate your data elsewhere. For me, $40 is not worth it for my use cases so I had to migrate my data to a new home.

### Deciding on using a VPS

I started looking into other hosted solutions like Turso and AWS but the pricing did not seem worth it to me and So since I wanted to be cheap, I went the route of just running a MySQL instance on a virtual private server (VPS) that I am already using. DigitalOcean has their own flavor of VPS’s called Droplets. I already utilize one for some of my sites and API’s so I might as well slap a MySQL instance on to it! I could write a seperate blog post on everything on my Droplet so I will spare some details when explaining installing the SQL instance.

### Installing MySQL and Setup

First I had to remotely connect to the server, I can do that by running the below command, using your user and VPS IP address:

`ssh user@ipaddress`

Once I got on the server, I installed MySQL by running the below command:

`sudo apt install mysql-server`

This uses linux’s built in package manager to install MySQL onto the server. Once I did that, I got into the MySQL shell as the root DB user, created a new user to use other than root for security concerns, gave it proper permissions, and locked down the root user in the MySQL config. I am being slightly vague with this to obfuscate some of my security but to learn more on ways to secure MySQL, the below links helped me:

- [Installing and Configuring MySQL](https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-20-04)
- [MySQL Security](https://dev.mysql.com/doc/refman/8.0/en/security.html)

Once I had everything configured to my liking, I then created a new database for the schema and data to be migrated to.

### Using MySQL Workbench to Migrate Databases

From there, I hopped over to MySQL Workbench which is a popular UI for connecting to MySQL databases and performing common database tasks, similar to SQL Developer for Oracle databases or SQL Server Management Studio (SSMS) for Microsoft SQL Server databases. With MySQL Workbench, I used the DB Migration Tool to generate a SQL script with my PlanetScale DB schema. There is an option to have it create the schema automatically however it was not working well with PlanetScale and I wanted a little bit of control to ensure that I did not get everything from PlanetScale since they had some of their baked in objects. I then ran that SQL script on the new database to create all the needed tables. From there, since MySQL Workbench migration tool was not playing nice with PlanetScale, I exported the data from the tables on the PlanetScale database and then imported them to the droplets database using MySQL Workbench’s import and export data tools. Below are links for more information on these tools:

- [Creating SQL Script With Migration Tool](https://dev.mysql.com/doc/workbench/en/wb-migration-wizard-schema-target-options.html)
- [Migrating Data With Migration Tool](https://dev.mysql.com/doc/workbench/en/wb-migration-wizard-data-migration-setup.html)
- [Table Data Export and Import Wizard](https://dev.mysql.com/doc/workbench/en/wb-admin-export-import-table.html)

### Pointing My API to the New Database

After that, I had all the data migrated. I just needed to set up my connections from the API. So I first created a user for the API connection. This was interesting because it required me to create the user specifically for the IP it was connecting from, unless I wanted to use a wildcard which would not be a secure choice. So after successfully being able to connect using Node. I updated my API’s .ENV file, which is a way to keep secrets and connection strings from being in the source code, to point to the new database and then pushed that to my server. Once I deployed the docker container for the API, I was seeing failures due to an API user not being created for the IP that it was connecting from, which turns out is not localhost. I instead had to use the private IP that the Docker container running my API had assigned. I will save explaining Docker containers for another blog post. Once I created the user and assigned it the necessary privileges, I was in business! Below are some additional readings on mentioned items:

- [MySQL Account Management: Specifying Account Names](https://dev.mysql.com/doc/mysql-security-excerpt/8.3/en/account-names.html)
- [Dotenv package for Node](https://www.npmjs.com/package/dotenv)

### Takeaways

So what I got out of this is that you have to be careful with committing some projects to hobby plans and could even serve as a reminder that committing something to cloud could be a problem if a cloud provider of any facet changes anything, your business must be able to adapt to not only pricing but many other kinds of changes that may occur that are completely out of your control All you can do is plan as best as you can before making any financial or technical commitments to anything.
