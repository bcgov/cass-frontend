# Frontend Devops Resources

This project uses the [openshift-developer-tools](https://github.com/BCDevOps/openshift-developer-tools/tree/master/bin) scripts to manage its OpenShift Build and Deployment configurations.  Refer to the associated project documentation for details.

## Structure

```
templates/
    frontend/
        frontend-build.json             // The Frontend builds to be added to tools project
        frontend-deploy.json            // Frontend deployment, to be added to application environments (dev, test, etc)
        frontend-deploy-prod.json       
    nginx-runtime/
        nginx-runtime-build.json        // nginx-runtime build to be added to tools
    yarn-builder/
        yarn-builder-build.json         // yarn-builder build to be added to tools
```

## Pipeline

### Policies

The project policies only need to be setup once.

Use `initOSProjects.sh` to setup the initial project policies on all of your projects at once.

The `frontend-build.json` defines a build configuration for a *Jenkins Pipeline* which uses the (`jenkinsfile`)[../Jenkinsfile] in the root of the repository.  This file defines our declarative pipeline, currently this is how the pipeline is structured:

- Assemble Runtime and Builder images
- ⬇
- Build Application Artifacts
- Combine Artifacts with Runtime
- ⬇
- Tag the Image as `dev`
- Verify deployment in dev project
- Wait for approval ⏱
- ⬇
- Tag the Image as `test`
- Verify deployment in test project
- Wait for approval ⏱ to tag for prod
- ⬇
- Tag the Image as `prod`

# Publishing your Build and Deployment Configurations

Use `genParams.sh` to setup your parameters for your various environments.

Use `genBuilds.sh` to publish or update your build configurations.

Use `genDepls.sh` to publish or update your deployment configurations.

# Background reading/Resources

[Free OpenShift book](https://www.openshift.com/promotions/for-developers.html) from RedHat – good overview

[Red Hat Container Development Kit](http://developers.redhat.com/products/cdk/overview/)

# OpenShift CI/CD pieline Demos:

- https://www.youtube.com/watch?v=65BnTLcDAJI
- https://www.youtube.com/watch?v=wSFyg6Etwx8
