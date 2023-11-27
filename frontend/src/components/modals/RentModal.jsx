import React, { useState, useMemo, useEffect } from "react";
import Modal from "./Modal";
import Heading from "../Heading";
import { categories } from "../navbars/Categories";
import CategoryInput from "../inputs/CategoryInput";
import useRentModal from "../../hooks/useRentModal";
import ImageUpload from "../inputs/ImageUpload";
import Counter from "../inputs/Counter";
import { useForm } from "react-hook-form";
import { Spin } from "antd";
import CountrySelect from "../inputs/CountrySelect";
import Map from "../Map";
import TextArea from "antd/es/input/TextArea";
import Input from "../inputs/Input";
import { useCreatePlace } from "../../hooks/usePlace";
const STEPS = {
  CATEGORY: 0,
  LOCATION: 1,
  INFO: 3,
  IMAGES: 2,
  DESCRIPTION: 4,
};

const RentModal = () => {
  const rentModal = useRentModal();
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [formData, setFormData] = useState({
    category: "",
    location: null,
    guestCount: 1,
    roomCount: 1,
    bathroomCount: 1,
    imageSrc: [],
    price: 1,
    address: "",
    title: "",
    description: "",
  });
  const [mapZoom, setMapZoom] = useState(12);
  const {
    register,
    handleSubmit,
    formState: { errors },
    resđet,
  } = useForm();
  const { data, isLoading, mutateAsync, isSuccess } = useCreatePlace();

  const setCustomValue = (id, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const onBack = () => {
    setStep((prev) => prev - 1);
  };

  const onNext = () => {
    setStep((prev) => prev + 1);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [step]);

  const handleImageUpload = (imageSrc) => {
    if (!formData.imageSrc.includes(imageSrc)) {
      setFormData((prevData) => ({
        ...prevData,
        imageSrc: [...prevData.imageSrc, imageSrc],
      }));
    }
  };

  useEffect(() => {
    if (formData.location) {
      setMapZoom(12);
    }
  }, [formData.location]);

  const handleChangeTitle = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      title: value,
    }));
  };

  const handleChangeAddress = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      address: value,
    }));
  };
  const handleChangeDescription = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      description: value,
    }));
  };

  const handleChangePrice = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      price: value,
    }));
  };
  const onSubmit = async () => {
    if (step !== STEPS.DESCRIPTION) {
      return onNext();
    }
    await mutateAsync(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      rentModal.onClose();
      setStep(STEPS.CATEGORY);
      setFormData({
        category: "",
        location: null,
        guestCount: 1,
        roomCount: 1,
        bathroomCount: 1,
        imageSrc: [],
        price: "",
        address: "",
        title: "",
        description: "",
      });
    }
  }, [isSuccess]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((category) => (
          <div key={category.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => {
                setCustomValue("category", category);
              }}
              selected={formData.category === category.label}
              label={category.label}
              icon={category.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />
        <CountrySelect
          value={formData.location}
          onChange={(value) => setCustomValue("location", value)}
        />
        <Map
          center={formData.location?.latlng}
          zoom={mapZoom}
          key={formData.location?.latlng}
        />
      </div>
    );
  }
  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of your place"
          subtitle="Show guests what your place looks like"
        />
        <ImageUpload
          onChange={handleImageUpload}
          imageSrc={formData.imageSrc}
        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
          subtitle="What amenities can guests expect?"
        />
        <Counter
          title="Number of guests"
          subtitle="How many guests do you allow?"
          value={formData.guestCount}
          onChange={(value) => setCustomValue("guestCount", value)}
        />
        <hr />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you have?"
          value={formData.roomCount}
          onChange={(value) => setCustomValue("roomCount", value)}
        />
        <hr />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
          value={formData.bathroomCount}
          onChange={(value) => setCustomValue("bathroomCount", value)}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8 overflow-y-scroll h-96">
        <Heading
          title="Describe your place to guests"
          subtitle="Tell guests what makes your place unique"
        />
            <Input
            label="Title" name="title"
              id="title"
              disabled={isLoading}
              register={register}
              errors={errors}
              isTextArea={false}
              value={formData.title}
              onChange={(e) => handleChangeTitle(e.target.value)}
              required
            />
            {errors.title && (
              <span className="text-red-500">Title is required</span>
            )}
            <Input
            label="Address" name="price"
              id="address"
              disabled={isLoading}
              register={register}
              errors={errors}
              isTextArea={false}
              value={formData.address}
              onChange={(e) => handleChangeAddress(e.target.value)}
              required
            />
            {errors.address && (
              <span className="text-red-500">Address is required</span>
            )}
            <Input
            label="Decription" name="decription"
              id="description"
              type="text"
              disabled={isLoading}
              register={register}
              isTextArea={true}
              rows={4} 
              errors={errors}
              value={formData.description}
              onChange={(e) => handleChangeDescription(e.target.value)}
              className="w-full"
              required
            />
            {errors.description && (
              <span className="text-red-500">Description is required</span>
            )}
          
          <Heading
            title="How much do you want to charge?"
            subtitle="Set a price per night"
          />
            <Input
            label="Price" name="price"
              type="number"
              prefix="$"
              id="price"
              formatPrice={true}
              disabled={isLoading}
              register={register}
              errors={errors}
              value={formData.price}
              onChange={(e) => handleChangePrice(e.target.value)}
              required
            />
            {errors.price && (
              <span className="text-red-500">Price is required</span>
            )}
      </div>
    );
  }
  
  
  

  return (
    <Modal
      centered
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      body={
        isLoading ? ( // Sử dụng isLoading từ API call
          <div className="flex justify-center items-center h-96">
            <Spin size="large" />
          </div>
        ) : (
          bodyContent
        )
      }
      title="Next your home!"
      isLoading={isLoading}
    />
  );
};

export default RentModal;
