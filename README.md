# C-Bot Project
> It's been built on the NodeJS platform.
> It'll get all responsobilities about pulling data from any sources.

## Modules implemented
- ...

## Technical Stack
- Node JS
- Express JS
- MongoDB
- Websocket
- Typescript

## Structure applied
![Project Structure](https://i0.wp.com/blog.logrocket.com/wp-content/uploads/2019/10/business-logic-api-routes.png?w=730&ssl=1)

**Routers** 
    --> **Controllers** 
        --> **Services** 
            --> **Repositories** 
                --> **Database**

## How to set it up
- Install some apps/services at first
    - Node JS
    - Redis
    -  PM2
- Setup the configs
    - ***.env*** (Follow the .env.default)
    - ***app/config/app.config.ts*** (Follow the app.default.config.ts)
- Install packages/libraries
    - Client/UI: ***cd ui-app & npm i***
    - Service/BE: ***npm i***
- Build and compile the app
    - Build the UI: ***npm run build***
    - Compile the BE: ***npm run compile***
- Integrate the app with PM2 (Follow the PM2 document)
- Run the app
    - With PM2: ***pm2 start/restart***
    - Without PM2: ***npm run prod***

## [API-docs link](https://c-bot.ccinteg.com/api-docs/#/)
## Contributors:
- [Phong V Lam](https://bitbucket.org/%7Ba6312c62-9c06-42f1-959c-2522b06579a8%7D/) - phong.lam@ccintegration.com
- [Samuel Nguyen](https://bitbucket.org/%7B09794583-e4e4-42c0-a402-fffa19e7c655%7D/) - samuel.nguyen@ccintegration.com
- [Phat Dang](https://bitbucket.org/%7Bcb2c1a9f-c59d-494d-9dd0-f2d3aed861be%7D/) - phat.dang@ccintegration.com