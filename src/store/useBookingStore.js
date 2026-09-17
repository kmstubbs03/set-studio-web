import { create } from 'zustand';

const useBookingStore = create((set, get) => ({
  // Step state (if we want to keep it global, but usually it's fine global to preserve between close/open, or we reset it)
  step: 0,
  setStep: (step) => set({ step }),

  // Location Details
  selectedArea: '',
  address: '',
  travelFee: null,
  distanceLoading: false,
  distanceError: '',

  // Preferences
  selectedProduct: 'Acrylic',
  selectedLength: 'Short',
  selectedArt: 'No Art',
  needsSoakOff: false,
  selectedPackage: 'basic',

  // User Details
  fullName: '',
  whatsapp: '',
  
  // Terms
  termsAccepted: false,

  // Reference Photo
  referencePhotoUrl: '',
  isUploadingPhoto: false,
  photoUploadError: '',

  // Calendar
  selectedDate: null,
  selectedTimes: [],

  // Universal setter
  setField: (field, value) => set({ [field]: value }),

  // Actions
  resetForm: () => set({
    step: 0,
    selectedArea: '',
    address: '',
    travelFee: null,
    distanceError: '',
    selectedProduct: 'Acrylic',
    selectedLength: 'Short',
    selectedArt: 'No Art',
    needsSoakOff: false,
    selectedPackage: 'basic',
    fullName: '',
    whatsapp: '',
    termsAccepted: false,
    referencePhotoUrl: '',
    isUploadingPhoto: false,
    photoUploadError: '',
    selectedDate: null,
    selectedTimes: [],
  }),

  calculateTravelFee: async () => {
    const { address, selectedArea } = get();
    if (!address || address.length < 5) return;
    
    set({ distanceLoading: true, distanceError: '' });
    
    try {
      const res = await fetch('/api/distance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address: address + (selectedArea ? ', ' + selectedArea : '') + ', Cape Town' })
      });
      const data = await res.json();
      
      if (res.ok && data.travelFee !== undefined) {
        set({ travelFee: data.travelFee, distanceError: '', distanceLoading: false });
      } else {
        set({ 
          distanceError: data.error || 'Could not find address. Try just your street and suburb.',
          travelFee: null,
          distanceLoading: false
        });
      }
    } catch (e) {
      set({ 
        distanceError: 'Something went wrong. Please try again.',
        travelFee: null,
        distanceLoading: false
      });
    }
  }
}));

export default useBookingStore;
