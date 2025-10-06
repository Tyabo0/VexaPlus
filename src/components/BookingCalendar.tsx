
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CalendarClock, MessageSquare, Upload, X } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from '@/hooks/use-toast';

const availableTimeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
  '5:00 PM', '6:00 PM', '7:00 PM'
];

const eventTypes = [
  'Concert', 'Corporate Event', 'Wedding', 'Birthday Party',
  'Festival', 'Conference', 'Club Night', 'Private Party',
  'Other'
];

const BookingCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [timeSlot, setTimeSlot] = useState<string>('');
  const [eventType, setEventType] = useState<string>('');
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    details: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (files.length + selectedFiles.length > 3) {
      toast({
        title: "Too many files",
        description: "Maximum 3 files allowed",
        variant: "destructive"
      });
      return;
    }
    setFiles(prev => [...prev, ...selectedFiles].slice(0, 3));
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !timeSlot || !eventType) {
      toast({
        title: "Missing information",
        description: "Please select a date, time slot, and event type",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare form data for Web3Forms (or EmailJS)
      const submitData = new FormData();
      
      // Web3Forms access key (get free at https://web3forms.com)
      const accessKey = import.meta.env.VITE_WEB3FORMS_KEY || 'YOUR_ACCESS_KEY_HERE';
      submitData.append('access_key', accessKey);
      
      // Booking details
      submitData.append('subject', `New Booking: ${eventType} - ${formData.name}`);
      submitData.append('from_name', formData.name);
      submitData.append('email', formData.email);
      submitData.append('phone', formData.phone);
      submitData.append('date', format(date, 'yyyy-MM-dd'));
      submitData.append('timeSlot', timeSlot);
      submitData.append('eventType', eventType);
      submitData.append('location', formData.location);
      submitData.append('message', `
Event Details:
- Type: ${eventType}
- Date: ${format(date, 'MMMM dd, yyyy')}
- Time: ${timeSlot}
- Location: ${formData.location}

Contact Information:
- Name: ${formData.name}
- Email: ${formData.email}
- Phone: ${formData.phone}

Additional Details:
${formData.details || 'No additional details provided'}

Files Attached: ${files.length > 0 ? files.map(f => f.name).join(', ') : 'None'}
      `);
      
      // Add files (Web3Forms supports file attachments)
      files.forEach((file) => {
        submitData.append('attachment', file);
      });

      // Send to Web3Forms API
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: submitData,
      });

      const result = await response.json();

      console.log('Web3Forms Response:', result);
      console.log('Access Key Used:', accessKey);

      if (result.success) {
        toast({
          title: "Booking request submitted!",
          description: `We'll contact you soon to confirm your ${eventType} on ${format(date, 'MMMM dd, yyyy')} at ${timeSlot}.`,
        });

        // Reset form
        setDate(undefined);
        setTimeSlot('');
        setEventType('');
        setFiles([]);
        setFormData({
          name: '',
          email: '',
          phone: '',
          location: '',
          details: ''
        });
      } else {
        console.error('Web3Forms Error:', result);
        throw new Error(result.message || 'Failed to submit booking');
      }
    } catch (error) {
      console.error('Booking submission error:', error);
      console.error('Error details:', error.message);
      toast({
        title: "Submission failed",
        description: error.message || "Unable to submit booking. Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="glassmorphism p-6 animate-fade-in">
        <div className="flex items-center space-x-2 mb-4">
          <CalendarClock className="h-5 w-5 text-psyco-green-DEFAULT" />
          <h3 className="text-xl font-medium">Select Date & Time</h3>
        </div>
        
        <div className="calendar-container pointer-events-auto">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            disabled={(date) => date < new Date() || date > new Date(new Date().setMonth(new Date().getMonth() + 6))}
            className="rounded-md border border-psyco-green-muted/50 bg-psyco-black-card"
          />
        </div>
        
        <div className="mt-6">
          <label className="block text-gray-300 mb-2">Select Time Slot</label>
          <Select value={timeSlot} onValueChange={setTimeSlot}>
            <SelectTrigger className="bg-psyco-black-DEFAULT border-psyco-green-muted/50">
              <SelectValue placeholder="Select a time slot" />
            </SelectTrigger>
            <SelectContent className="bg-psyco-black-light border-psyco-green-muted/50">
              {availableTimeSlots.map(time => (
                <SelectItem key={time} value={time}>{time}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="mt-4">
          <label className="block text-gray-300 mb-2">Event Type</label>
          <Select value={eventType} onValueChange={setEventType}>
            <SelectTrigger className="bg-psyco-black-DEFAULT border-psyco-green-muted/50">
              <SelectValue placeholder="Select event type" />
            </SelectTrigger>
            <SelectContent className="bg-psyco-black-light border-psyco-green-muted/50">
              {eventTypes.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="glassmorphism p-6 animate-fade-in animation-delay-100">
        <div className="flex items-center space-x-2 mb-4">
          <MessageSquare className="h-5 w-5 text-psyco-green-DEFAULT" />
          <h3 className="text-xl font-medium">Contact Information</h3>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-300 mb-1">Name</label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="bg-psyco-black-light border-psyco-green-muted/50"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-gray-300 mb-1">Email</label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="bg-psyco-black-light border-psyco-green-muted/50"
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-gray-300 mb-1">Phone</label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="bg-psyco-black-light border-psyco-green-muted/50"
            />
          </div>
          
          <div>
            <label htmlFor="location" className="block text-gray-300 mb-1">Event Location</label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
              className="bg-psyco-black-light border-psyco-green-muted/50"
            />
          </div>
          
          <div>
            <label htmlFor="details" className="block text-gray-300 mb-1">Event Details</label>
            <Textarea
              id="details"
              name="details"
              rows={3}
              value={formData.details}
              onChange={handleInputChange}
              className="bg-psyco-black-light border-psyco-green-muted/50"
              placeholder="Please provide any specific requirements or details about your event"
            />
          </div>

          <div>
            <label htmlFor="files" className="block text-gray-300 mb-1">
              Attachments (Images, PDFs - max 3 files)
            </label>
            <div className="space-y-2">
              <label 
                htmlFor="file-upload" 
                className="flex items-center justify-center w-full px-4 py-3 border border-psyco-green-muted/50 rounded-md cursor-pointer bg-psyco-black-light hover:bg-psyco-black-DEFAULT transition-colors"
              >
                <Upload className="h-4 w-4 mr-2 text-psyco-green-DEFAULT" />
                <span className="text-sm text-gray-300">
                  {files.length === 0 ? 'Upload files' : `${files.length}/3 files selected`}
                </span>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  accept="image/*,application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  disabled={files.length >= 3}
                />
              </label>
              
              {files.length > 0 && (
                <div className="space-y-1">
                  {files.map((file, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between px-3 py-2 bg-psyco-black-DEFAULT rounded text-sm"
                    >
                      <span className="text-gray-300 truncate flex-1">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="ml-2 text-red-400 hover:text-red-300"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-psyco-green-DEFAULT hover:bg-psyco-green-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Request Booking'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default BookingCalendar;
