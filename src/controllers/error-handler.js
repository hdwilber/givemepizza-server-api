export default function (models, { config }) {
  return (error, req, res, next) => {
    if (error.process) {
      error.process(req, res, next)
    } else {
      next(error)
    }
  }
}

