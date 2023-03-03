const Review = require('../models/reviews.model');
const User = require('../models/user.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validExistReview = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const review = Review.findOne({
    where: {
      id,
      status: true,
    },
    include: [
      {
        model: User,
      },
    ],
  });

  if (!review) {
    return next(new AppError('Review not found', 404));
  }
  req.review = review;
  req.user = review.User;
  next();
});
