const { dateFormat, priceFormat } = require("../helper/helper");
const { User, UserProfile, Menu } = require("../models/index");
class AdminController {
  static admin(req, res) {
    const { UserId } = req.session;
    let options = {
      where: {
        id: UserId,
      },
      include: [
        {
          model: UserProfile,
        },
      ],
    };
    let data = [];
    User.findOne(options)
      .then((result) => {
        data = result;
        return Menu.findAll();
      })
      .then((menu) => {
        res.render("admin", { data, menu, priceFormat, dateFormat });
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }

  static addMenuForm(req, res) {
    const { error } = req.query;
    res.render("addMenuForm", { error });
  }
  static addMenuProcess(req, res) {
    const { name, imgUrl, category, description, price } = req.body;
    Menu.create({ name, imgUrl, category, description, price })
      .then(() => {
        res.redirect("/admin");
      })
      .catch((err) => {
        console.log(err);
        if (err.name === "SequelizeValidationError") {
          let error = err.errors.map((el) => el.message);
          res.redirect(`/admin/addMenu?error=${error}`);
        } else {
          res.send(err);
        }
      });
  }

  static deleteMenu(req, res) {
    const { MenuId } = req.params;
    Menu.destroy({ where: { id: MenuId } })
      .then(() => {
        res.redirect("/admin");
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }

  static editMenuForm(req, res) {
    const { MenuId } = req.params;
    Menu.findByPk(MenuId)
      .then((menu) => {
        res.render("editMenuForm", { menu });
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }
  static editMenuProcess(req, res) {
    const { MenuId } = req.params;
    const { name, imgUrl, category, description, stock, price } = req.body;
    Menu.update(
      { name, imgUrl, category, description, stock, price },
      { where: { id: MenuId } }
    )
      .then(() => {
        res.redirect("/admin");
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }
}

module.exports = AdminController;
