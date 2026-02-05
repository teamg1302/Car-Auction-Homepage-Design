import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Upload,
  ChevronRight,
  ChevronLeft,
  X,
  Check,
  AlertCircle,
  Image as ImageIcon,
  MapPin,
  DollarSign,
  Car,
  Info,
} from 'lucide-react';
import { ROUTES, CAR_MAKES, CAR_TYPES, TRANSMISSION_TYPES, FUEL_TYPES, CONDITION_TYPES } from '@/constants';
import type { CarType, TransmissionType, FuelType, ConditionType, DrivetrainType } from '@/types';
import { Spinner } from '@/components/ui/spinner';
import gsap from 'gsap';

const STEPS = [
  { id: 1, title: 'Basic Info', icon: Car },
  { id: 2, title: 'Details', icon: Info },
  { id: 3, title: 'Description', icon: ImageIcon },
  { id: 4, title: 'Images', icon: ImageIcon },
  { id: 5, title: 'Location', icon: MapPin },
  { id: 6, title: 'Auction', icon: DollarSign },
];

interface FormData {
  // Basic Info
  year: string;
  make: string;
  model: string;
  trim: string;
  type: CarType | '';
  color: string;
  
  // Vehicle Details
  mileage: string;
  transmission: TransmissionType | '';
  fuel: FuelType | '';
  condition: ConditionType | '';
  vin: string;
  
  // Description
  description: string;
  features: string[];
  featureInput: string;
  
  // Images
  images: File[];
  imagePreviews: string[];
  
  // Location
  city: string;
  state: string;
  zipCode: string;
  country: string;
  
  // Specifications (optional)
  engine: string;
  horsepower: string;
  torque: string;
  drivetrain: DrivetrainType | '';
  seats: string;
  doors: string;
  mpgCity: string;
  mpgHighway: string;
  
  // Auction Settings
  startingBid: string;
  reservePrice: string;
  auctionDuration: string; // days
  endDate: string;
}

const initialFormData: FormData = {
  year: '',
  make: '',
  model: '',
  trim: '',
  type: '',
  color: '',
  mileage: '',
  transmission: '',
  fuel: '',
  condition: '',
  vin: '',
  description: '',
  features: [],
  featureInput: '',
  images: [],
  imagePreviews: [],
  city: '',
  state: '',
  zipCode: '',
  country: 'United States',
  engine: '',
  horsepower: '',
  torque: '',
  drivetrain: '',
  seats: '',
  doors: '',
  mpgCity: '',
  mpgHighway: '',
  startingBid: '',
  reservePrice: '',
  auctionDuration: '7',
  endDate: '',
};

export function SellPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const pageRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      );
    }, pageRef);

    return () => ctx.revert();
  }, [currentStep]);

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1: // Basic Info
        if (!formData.year) newErrors.year = 'Year is required';
        if (!formData.make) newErrors.make = 'Make is required';
        if (!formData.model) newErrors.model = 'Model is required';
        if (!formData.type) newErrors.type = 'Body type is required';
        if (!formData.color) newErrors.color = 'Color is required';
        break;
      case 2: // Vehicle Details
        if (!formData.mileage) newErrors.mileage = 'Mileage is required';
        if (!formData.transmission) newErrors.transmission = 'Transmission is required';
        if (!formData.fuel) newErrors.fuel = 'Fuel type is required';
        if (!formData.condition) newErrors.condition = 'Condition is required';
        break;
      case 3: // Description
        if (!formData.description || formData.description.length < 50) {
          newErrors.description = 'Description must be at least 50 characters';
        }
        break;
      case 4: // Images
        if (formData.images.length < 3) {
          newErrors.images = 'At least 3 images are required';
        }
        break;
      case 5: // Location
        if (!formData.city) newErrors.city = 'City is required';
        if (!formData.state) newErrors.state = 'State is required';
        if (!formData.zipCode) newErrors.zipCode = 'Zip code is required';
        break;
      case 6: // Auction
        if (!formData.startingBid) newErrors.startingBid = 'Starting bid is required';
        if (formData.reservePrice && parseFloat(formData.reservePrice) <= parseFloat(formData.startingBid || '0')) {
          newErrors.reservePrice = 'Reserve price must be higher than starting bid';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleInputChange = (field: keyof FormData, value: string | string[] | File[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newFiles = [...formData.images, ...files].slice(0, 20); // Max 20 images
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));

    setFormData((prev) => ({
      ...prev,
      images: newFiles,
      imagePreviews: newPreviews,
    }));
  };

  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    const newPreviews = formData.imagePreviews.filter((_, i) => i !== index);
    
    // Revoke object URLs to prevent memory leaks
    URL.revokeObjectURL(formData.imagePreviews[index]);
    
    setFormData((prev) => ({
      ...prev,
      images: newImages,
      imagePreviews: newPreviews,
    }));
  };

  const addFeature = () => {
    if (formData.featureInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, prev.featureInput.trim()],
        featureInput: '',
      }));
    }
  };

  const removeFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    if (!validateStep(6)) return;

    setIsSubmitting(true);
    // TODO: Implement API call to submit listing
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // Navigate to success page or listing page
      navigate(ROUTES.BROWSE);
    }, 2000);
  };

  const calculateEndDate = (days: string) => {
    const duration = parseInt(days) || 7;
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + duration);
    return endDate.toISOString().split('T')[0];
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="font-display text-xl sm:text-2xl dark:text-white text-foreground mb-4 sm:mb-6">Basic Information</h3>
              <p className="dark:text-white/60 text-foreground/60 text-xs sm:text-sm mb-4 sm:mb-6">
                Tell us about your vehicle's basic details.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <Label htmlFor="year">Year *</Label>
                <Input
                  id="year"
                  type="number"
                  value={formData.year}
                  onChange={(e) => handleInputChange('year', e.target.value)}
                  placeholder="2020"
                  min="1900"
                  max={new Date().getFullYear() + 1}
                  className={errors.year ? 'border-destructive' : ''}
                />
                {errors.year && <p className="text-destructive text-xs mt-1">{errors.year}</p>}
              </div>

              <div>
                <Label htmlFor="make">Make *</Label>
                <Select
                  value={formData.make}
                  onValueChange={(value) => handleInputChange('make', value)}
                >
                  <SelectTrigger id="make" className={errors.make ? 'border-destructive' : ''}>
                    <SelectValue placeholder="Select make" />
                  </SelectTrigger>
                  <SelectContent>
                    {CAR_MAKES.filter((make) => make !== 'Any Make').map((make) => (
                      <SelectItem key={make} value={make}>
                        {make}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.make && <p className="text-destructive text-xs mt-1">{errors.make}</p>}
              </div>

              <div>
                <Label htmlFor="model">Model *</Label>
                <Input
                  id="model"
                  value={formData.model}
                  onChange={(e) => handleInputChange('model', e.target.value)}
                  placeholder="911"
                  className={errors.model ? 'border-destructive' : ''}
                />
                {errors.model && <p className="text-destructive text-xs mt-1">{errors.model}</p>}
              </div>

              <div>
                <Label htmlFor="trim">Trim (Optional)</Label>
                <Input
                  id="trim"
                  value={formData.trim}
                  onChange={(e) => handleInputChange('trim', e.target.value)}
                  placeholder="Carrera S"
                />
              </div>

              <div>
                <Label htmlFor="type">Body Type *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => handleInputChange('type', value as CarType)}
                >
                  <SelectTrigger id="type" className={errors.type ? 'border-destructive' : ''}>
                    <SelectValue placeholder="Select body type" />
                  </SelectTrigger>
                  <SelectContent>
                    {CAR_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.type && <p className="text-destructive text-xs mt-1">{errors.type}</p>}
              </div>

              <div>
                <Label htmlFor="color">Color *</Label>
                <Input
                  id="color"
                  value={formData.color}
                  onChange={(e) => handleInputChange('color', e.target.value)}
                  placeholder="Black"
                  className={errors.color ? 'border-destructive' : ''}
                />
                {errors.color && <p className="text-destructive text-xs mt-1">{errors.color}</p>}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="font-display text-2xl dark:text-white text-foreground mb-6">Vehicle Details</h3>
              <p className="dark:text-white/60 text-foreground/60 text-sm mb-6">
                Provide specific details about your vehicle's condition and specifications.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="mileage">Mileage *</Label>
                <Input
                  id="mileage"
                  type="number"
                  value={formData.mileage}
                  onChange={(e) => handleInputChange('mileage', e.target.value)}
                  placeholder="50000"
                  min="0"
                  className={errors.mileage ? 'border-destructive' : ''}
                />
                {errors.mileage && <p className="text-destructive text-xs mt-1">{errors.mileage}</p>}
              </div>

              <div>
                <Label htmlFor="transmission">Transmission *</Label>
                <Select
                  value={formData.transmission}
                  onValueChange={(value) => handleInputChange('transmission', value as TransmissionType)}
                >
                  <SelectTrigger id="transmission" className={errors.transmission ? 'border-destructive' : ''}>
                    <SelectValue placeholder="Select transmission" />
                  </SelectTrigger>
                  <SelectContent>
                    {TRANSMISSION_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.transmission && <p className="text-destructive text-xs mt-1">{errors.transmission}</p>}
              </div>

              <div>
                <Label htmlFor="fuel">Fuel Type *</Label>
                <Select
                  value={formData.fuel}
                  onValueChange={(value) => handleInputChange('fuel', value as FuelType)}
                >
                  <SelectTrigger id="fuel" className={errors.fuel ? 'border-destructive' : ''}>
                    <SelectValue placeholder="Select fuel type" />
                  </SelectTrigger>
                  <SelectContent>
                    {FUEL_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.fuel && <p className="text-destructive text-xs mt-1">{errors.fuel}</p>}
              </div>

              <div>
                <Label htmlFor="condition">Condition *</Label>
                <Select
                  value={formData.condition}
                  onValueChange={(value) => handleInputChange('condition', value as ConditionType)}
                >
                  <SelectTrigger id="condition" className={errors.condition ? 'border-destructive' : ''}>
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    {CONDITION_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.condition && <p className="text-destructive text-xs mt-1">{errors.condition}</p>}
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="vin">VIN (Optional)</Label>
                <Input
                  id="vin"
                  value={formData.vin}
                  onChange={(e) => handleInputChange('vin', e.target.value.toUpperCase())}
                  placeholder="1HGBH41JXMN109186"
                  maxLength={17}
                />
              </div>
            </div>

            <div className="mt-8 p-4 dark:bg-white/5 bg-black/5 rounded-xl dark:border border-white/10 border-black/10">
              <h4 className="font-semibold dark:text-white text-foreground mb-4">Optional Specifications</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="engine">Engine</Label>
                  <Input
                    id="engine"
                    value={formData.engine}
                    onChange={(e) => handleInputChange('engine', e.target.value)}
                    placeholder="3.0L V6"
                  />
                </div>
                <div>
                  <Label htmlFor="horsepower">Horsepower</Label>
                  <Input
                    id="horsepower"
                    type="number"
                    value={formData.horsepower}
                    onChange={(e) => handleInputChange('horsepower', e.target.value)}
                    placeholder="300"
                  />
                </div>
                <div>
                  <Label htmlFor="torque">Torque (lb-ft)</Label>
                  <Input
                    id="torque"
                    type="number"
                    value={formData.torque}
                    onChange={(e) => handleInputChange('torque', e.target.value)}
                    placeholder="295"
                  />
                </div>
                <div>
                  <Label htmlFor="drivetrain">Drivetrain</Label>
                  <Select
                    value={formData.drivetrain}
                    onValueChange={(value) => handleInputChange('drivetrain', value as DrivetrainType)}
                  >
                    <SelectTrigger id="drivetrain">
                      <SelectValue placeholder="Select drivetrain" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="FWD">FWD</SelectItem>
                      <SelectItem value="RWD">RWD</SelectItem>
                      <SelectItem value="AWD">AWD</SelectItem>
                      <SelectItem value="4WD">4WD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="seats">Seats</Label>
                  <Input
                    id="seats"
                    type="number"
                    value={formData.seats}
                    onChange={(e) => handleInputChange('seats', e.target.value)}
                    placeholder="4"
                    min="2"
                    max="8"
                  />
                </div>
                <div>
                  <Label htmlFor="doors">Doors</Label>
                  <Input
                    id="doors"
                    type="number"
                    value={formData.doors}
                    onChange={(e) => handleInputChange('doors', e.target.value)}
                    placeholder="2"
                    min="2"
                    max="5"
                  />
                </div>
                <div>
                  <Label htmlFor="mpgCity">MPG City</Label>
                  <Input
                    id="mpgCity"
                    type="number"
                    value={formData.mpgCity}
                    onChange={(e) => handleInputChange('mpgCity', e.target.value)}
                    placeholder="20"
                  />
                </div>
                <div>
                  <Label htmlFor="mpgHighway">MPG Highway</Label>
                  <Input
                    id="mpgHighway"
                    type="number"
                    value={formData.mpgHighway}
                    onChange={(e) => handleInputChange('mpgHighway', e.target.value)}
                    placeholder="28"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="font-display text-2xl dark:text-white text-foreground mb-6">Description & Features</h3>
              <p className="dark:text-white/60 text-foreground/60 text-sm mb-6">
                Write a detailed description and list key features that make your vehicle special.
              </p>
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe your vehicle in detail. Include information about its history, condition, modifications, maintenance records, and what makes it special..."
                rows={8}
                className={errors.description ? 'border-destructive' : ''}
              />
              <p className="dark:text-white/40 text-foreground/40 text-xs mt-2">
                {formData.description.length} / 50 minimum characters
              </p>
              {errors.description && <p className="text-destructive text-xs mt-1">{errors.description}</p>}
            </div>

            <div>
              <Label htmlFor="features">Key Features</Label>
              <div className="flex gap-2 mb-3">
                <Input
                  id="features"
                  value={formData.featureInput}
                  onChange={(e) => handleInputChange('featureInput', e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addFeature();
                    }
                  }}
                  placeholder="e.g., Leather seats, Sunroof, Navigation"
                />
                <Button type="button" onClick={addFeature} variant="outline">
                  Add
                </Button>
              </div>
              {formData.features.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 dark:bg-white/5 bg-black/5 dark:border border-white/10 border-black/10 rounded-lg px-3 py-1.5"
                    >
                      <span className="text-sm dark:text-white/80 text-foreground/80">{feature}</span>
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="dark:text-white/40 text-foreground/40 dark:hover:text-white hover:text-foreground transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="font-display text-2xl dark:text-white text-foreground mb-6">Vehicle Images</h3>
              <p className="dark:text-white/60 text-foreground/60 text-sm mb-6">
                Upload high-quality photos of your vehicle. At least 3 images are required.
              </p>
            </div>

            <div className="border-2 border-dashed dark:border-white/20 border-black/20 rounded-xl p-8 text-center hover:border-racing-red/50 transition-colors">
              <Upload className="w-12 h-12 dark:text-white/40 text-foreground/40 mx-auto mb-4" />
              <Label htmlFor="image-upload" className="cursor-pointer">
                <span className="dark:text-white text-foreground font-semibold">Click to upload images</span>
                <span className="dark:text-white/60 text-foreground/60 text-sm block mt-2">
                  PNG, JPG up to 10MB each (max 20 images)
                </span>
              </Label>
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            {errors.images && <p className="text-destructive text-xs">{errors.images}</p>}

            {formData.imagePreviews.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
                {formData.imagePreviews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg dark:border border-white/10 border-black/10"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 w-6 h-6 bg-destructive rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4 dark:text-white text-foreground" />
                    </button>
                    {index === 0 && (
                      <div className="absolute bottom-2 left-2 bg-racing-red text-white text-xs px-2 py-1 rounded">
                        Main
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="font-display text-2xl dark:text-white text-foreground mb-6">Location</h3>
              <p className="dark:text-white/60 text-foreground/60 text-sm mb-6">
                Where is your vehicle located? This helps buyers arrange pickup or shipping.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="Los Angeles"
                  className={errors.city ? 'border-destructive' : ''}
                />
                {errors.city && <p className="text-destructive text-xs mt-1">{errors.city}</p>}
              </div>

              <div>
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  placeholder="California"
                  className={errors.state ? 'border-destructive' : ''}
                />
                {errors.state && <p className="text-destructive text-xs mt-1">{errors.state}</p>}
              </div>

              <div>
                <Label htmlFor="zipCode">Zip Code *</Label>
                <Input
                  id="zipCode"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  placeholder="90001"
                  className={errors.zipCode ? 'border-destructive' : ''}
                />
                {errors.zipCode && <p className="text-destructive text-xs mt-1">{errors.zipCode}</p>}
              </div>

              <div>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  placeholder="United States"
                />
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="font-display text-2xl dark:text-white text-foreground mb-6">Auction Settings</h3>
              <p className="dark:text-white/60 text-foreground/60 text-sm mb-6">
                Set your starting bid, optional reserve price, and auction duration.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="startingBid">Starting Bid ($) *</Label>
                <Input
                  id="startingBid"
                  type="number"
                  value={formData.startingBid}
                  onChange={(e) => handleInputChange('startingBid', e.target.value)}
                  placeholder="50000"
                  min="0"
                  step="100"
                  className={errors.startingBid ? 'border-destructive' : ''}
                />
                {errors.startingBid && <p className="text-destructive text-xs mt-1">{errors.startingBid}</p>}
              </div>

              <div>
                <Label htmlFor="reservePrice">Reserve Price ($) (Optional)</Label>
                <Input
                  id="reservePrice"
                  type="number"
                  value={formData.reservePrice}
                  onChange={(e) => handleInputChange('reservePrice', e.target.value)}
                  placeholder="60000"
                  min="0"
                  step="100"
                  className={errors.reservePrice ? 'border-destructive' : ''}
                />
                <p className="dark:text-white/40 text-foreground/40 text-xs mt-1">
                  If bidding doesn't reach this price, you're not obligated to sell.
                </p>
                {errors.reservePrice && <p className="text-destructive text-xs mt-1">{errors.reservePrice}</p>}
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="auctionDuration">Auction Duration (Days)</Label>
                <Select
                  value={formData.auctionDuration}
                  onValueChange={(value) => {
                    handleInputChange('auctionDuration', value);
                    handleInputChange('endDate', calculateEndDate(value));
                  }}
                >
                  <SelectTrigger id="auctionDuration">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 Days</SelectItem>
                    <SelectItem value="5">5 Days</SelectItem>
                    <SelectItem value="7">7 Days</SelectItem>
                    <SelectItem value="10">10 Days</SelectItem>
                    <SelectItem value="14">14 Days</SelectItem>
                  </SelectContent>
                </Select>
                {formData.endDate && (
                  <p className="dark:text-white/60 text-foreground/60 text-sm mt-2">
                    Auction will end on: {new Date(formData.endDate).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-8 p-6 dark:bg-white/5 bg-black/5 rounded-xl dark:border border-white/10 border-black/10">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-5 h-5 text-racing-red mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold dark:text-white text-foreground mb-2">Important Information</h4>
                  <ul className="dark:text-white/60 text-foreground/60 text-sm space-y-1">
                    <li>• Your listing will be reviewed before going live</li>
                    <li>• You can edit your listing before it's approved</li>
                    <li>• Once the auction starts, certain details cannot be changed</li>
                    <li>• You'll be notified when your listing is approved and goes live</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <main ref={pageRef} className="relative pt-20 min-h-screen">
      <div className="absolute inset-0 mesh-gradient dark:opacity-30 opacity-20" />
      
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl dark:text-white text-foreground mb-3 sm:mb-4 tracking-[0.02em] relative">
              <span className="block">LIST YOUR</span>
              <span className="block text-gradient-accent">VEHICLE</span>
              <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-racing-red to-transparent" />
            </h1>
            <p className="dark:text-white/60 text-foreground/60 text-lg max-w-2xl mx-auto">
              Create your listing in just a few steps. Fill out the form below to get started.
            </p>
          </div>

          {/* Step Indicator */}
          <div className="mb-6 sm:mb-8 overflow-x-auto">
            <div className="flex items-center justify-between relative min-w-[600px] sm:min-w-0">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 dark:bg-white/10 bg-black/10 -translate-y-1/2" />
              <div
                className="absolute top-1/2 left-0 h-0.5 bg-racing-red transition-all duration-500 -translate-y-1/2"
                style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
              />
              {STEPS.map((step) => {
                const StepIcon = step.icon;
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;
                
                return (
                  <div key={step.id} className="relative z-10 flex flex-col items-center">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                        isActive
                          ? 'bg-racing-red border-racing-red scale-110'
                          : isCompleted
                          ? 'bg-racing-red/20 border-racing-red'
                          : 'dark:bg-charcoal-light bg-card dark:border-white/20 border-black/20'
                      }`}
                    >
                      <StepIcon
                        className={`w-4 h-4 sm:w-5 sm:h-5 ${
                          isActive || isCompleted ? 'dark:text-white text-foreground' : 'dark:text-white/40 text-foreground/40'
                        }`}
                      />
                    </div>
                    <span
                      className={`text-[10px] sm:text-xs mt-2 font-semibold uppercase tracking-wider text-center ${
                        isActive ? 'dark:text-white text-foreground' : 'dark:text-white/40 text-foreground/40'
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form Card */}
          <div ref={formRef} className="glass-card-strong p-4 sm:p-6 md:p-8 lg:p-12">
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 sm:mt-12 pt-6 sm:pt-8 dark:border-t border-white/10 border-black/10 gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>

              {currentStep < STEPS.length ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-2"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Spinner className="w-4 h-4" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      Submit Listing
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
