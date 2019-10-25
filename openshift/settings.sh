export PROJECT_NAMESPACE="apndkr"
export GIT_URI="https://github.com/bcgov/cass-frontend.git"
export GIT_REF="cass-renaming"

# The project components
export components="nginx-runtime yarn-builder frontend"

# Skip Jenkins pipeline processing for this project.  The pipelines are integrated into the build templates.
export SKIP_PIPELINE_PROCESSING=1

# The list of templates to ignore
export ignore_templates="frontend-deploy-blue-green"
