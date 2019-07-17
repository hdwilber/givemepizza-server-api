import CustomError from './custom-error'

class NotFoundError  extends CustomError {
  constructor(message = '404 error') {
    super(message)
  }
  process(req, res, next) {
    res.status(404).json({
      error: this.message,
    })
  }
}

export default NotFoundError

