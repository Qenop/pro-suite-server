import express, { Request, Response } from 'express';
import Property from '../models/Property';

const router = express.Router();

// Create a property
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const newProperty = new Property(req.body);
    const savedProperty = await newProperty.save();
    res.status(201).json(savedProperty);
  } catch (error) {
    console.error('❌ Error saving property:', error);
    res.status(500).json({ message: 'Failed to save property' });
  }
});

// Get all properties
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (error) {
    console.error('❌ Error fetching properties:', error);
    res.status(500).json({ message: 'Failed to fetch properties' });
  }
});

// Get single property by ID
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      res.status(404).json({ message: 'Property not found' });
    } else {
      res.json(property);
    }
  } catch (error) {
    console.error('❌ Error fetching property:', error);
    res.status(500).json({ message: 'Failed to fetch property' });
  }
});

// Update a property by ID
router.put('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProperty) {
      res.status(404).json({ message: 'Property not found' });
    } else {
      res.json(updatedProperty);
    }
  } catch (error) {
    console.error('❌ Error updating property:', error);
    res.status(500).json({ message: 'Failed to update property' });
  }
});


export default router;
