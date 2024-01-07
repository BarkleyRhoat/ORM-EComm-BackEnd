const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

  // find all tags
  // be sure to include its associated Product data
  router.get('/', async (req, res) => {
    try {
      const tags = await Tag.findAll({
        include: [{ model: Product, through: ProductTag }]
      });
      res.status(200).json(tags);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // find a single tag by its `id`
  // be sure to include its associated Product data
  router.get('/:id', async (req, res) => {
    try {
      const tag = await Tag.findByPk(req.params.id, {
        include: [{ model: Product, through: ProductTag }]
      });
  
      if (tag) {
        res.status(200).json(tag);
      } else {
        res.status(404).json({ message: 'Tag not found' });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // create a new tag
  router.post('/', async (req, res) => {
    try {
      const tag = await Tag.create(req.body);
      res.status(201).json(tag);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  // update a tag's name by its `id` value
  router.put('/:id', async (req, res) => {
    try {
      const [numRowsUpdated, updatedTag] = await Tag.update(
        { tag_name: req.body.tag_name },
        {
          where: { id: req.params.id },
          returning: true
        }
      );
  
      if (numRowsUpdated > 0) {
        res.json(updatedTag[0]);
      } else {
        res.status(404).json({ message: 'Tag not found' });
      }
    } catch (err) {
      res.status(400).json(err);
    }
  });

  // delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const result = await Tag.destroy({
      where: { id: req.params.id }
    });

    if (result) {
      res.status(200).json({ message: 'Tag deleted successfully' });
    } else {
      res.status(404).json({ message: 'Tag not found' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
