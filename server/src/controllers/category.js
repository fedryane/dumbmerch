const { product, user, category, productcategory } = require("../../models");

// get all category
exports.getCategorys = async (req, res) => {
  try {
    let data = await category.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.send({
      status: "success",
      data: {
        category: data,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server error",
    });
  }
};

// get categories by id / details
exports.getCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await category.findOne({
      where: { id },
      attributes: {
        exclude: ["idUser", "createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      data: {
        category: data,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server error",
    });
  }
};

// update categories
exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const data = req.body;
    console.log(data);
    let updateCategory = await category.update(
      {
        ...data,
      },

      { where: { id } }
    );

    updateCategory = JSON.parse(JSON.stringify(data));

    updateCategory = {
      ...updateCategory,
    };

    res.status(200).send({
      status: "success",
      message: `Update category at id: ${id} success`,
      data: {
        category: updateCategory,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      status: "Updated product failed",
      message: "Server Error",
    });
  }
};

// add category
exports.addCategory = async (req, res) => {
  try {
    const data = req.body;
    let newCategory = await category.create({
      ...data,
      name: req.body.name,
    });

    newCategory = JSON.parse(JSON.stringify(newCategory));
    newCategory = {
      ...newCategory,
    };
    res.send({
      status: "success",
      data: {
        newCategory,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

// delete category
exports.deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;
    let data = await category.destroy({
      where: { id },
    });

    data = JSON.parse(JSON.stringify(data));

    res.send({
      status: "success",
      message: `Delete category id: ${id} success`,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server error",
    });
  }
};
