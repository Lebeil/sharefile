create two fit repos - Frontend & Backend

### Backend to Heroku

-- clear unnecessary logs & check env variables

1. check tsconfig for out dir
2. go to package. json =›add build and start script
3. delete package.lock.json file if exists

4. login to heroku
5. create new app
6. install heroku cli
7. test cli : login to heroku : heroku login
8. initialize git and add git remote
9. add heroku remote to the git
10. add ci/cd with github

11. set env variables in heroku app : heroku config:set envs two ways
    client endpoint! will add later
12. push code
13. push code to github
14. watch heroku logs : heroku logs --tail -a <app-name>
    Should be automatically deployed
15. done !!!

---

test the apis

1. upload a file in postman

### Frontend to Versel

- clear unnecessary logs & check env variables(api_endpoint)

1. push code
2. login to vercel with github
3. add repo
4. configure env variables
5. deploy
6. done 

--- 

Go to heroku and add the client envs

set automatic deployment in heroku (else git push heroku main)