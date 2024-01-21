const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

  // find all tags
  // be sure to include its associated Product data
  router.get('/', async (req, res) => {
    try {
      const allTags = await Tag.findAll({
        include: [{
          model: Product
        }]
        // include: [{ model: Product, through: ProductTag }]
      });
      res.status(200).json(allTags);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // find a single tag by its `id`
  // be sure to include its associated Product data
  router.get('/:id', async (req, res) => {
    try {
      const tag = await Tag.findByPk(req.params.id, {
        include: [{
          model: Product
        }]
        // include: [{ model: Product, through: ProductTag }]
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
      const newTag = await Tag.create(req.body);
      res.status(201).json(newTag);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  // update a tag's name by its `id` value
  router.put('/:id', async (req, res) => {

    try {
      const updatedTag = await Tag.update(req.body, {
        where: {
          id: req.params.id
        }
      });
      res.status(200).json(updatedTag);
    } catch (error) {

      console.error(error);
      res.status(400).json(error);
    }
  });
        
       
   

  // delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(deletedTag);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

module.exports = router;
