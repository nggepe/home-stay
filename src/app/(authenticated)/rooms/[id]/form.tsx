'use client';

import { updateProduct } from '@/repositories/product-repository';
import FormGroup from '@/shared/ui/form-group';
import { useToast } from '@/shared/ui/global-toast';
import { Box, Button, Card, Grid, TextArea, TextField } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
type ProductForm = {
  name: string;
  description: string;
  price: number;
};

interface UpdateRoomFormProps {
  id: number;
  defaultValue: ProductForm;
}

export const UpdateRoomForm = ({ id, defaultValue }: UpdateRoomFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ProductForm>({ defaultValues: defaultValue });

  const handleOnSubmit = async (data: ProductForm) => {
    setIsSubmitting(true);
    await updateProduct(id, {
      name: data.name,
      price: Number(data.price),
      createdAt: new Date(),
      updatedAt: new Date(),
      type: 'ROOM',
      description: data.description,
    });
    setIsSubmitting(false);
    showToast('Room created successfully', 'success');
    router.push('/rooms');
  };

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <Card>
        <Grid columns={{ xs: '1', sm: '1', md: '2', lg: '2', xl: '2' }} gap={'3'}>
          <Box>
            <FormGroup error={errors.name?.message}>
              <label htmlFor="name">Name</label>
              <TextField.Root
                color={errors.name ? 'red' : 'green'}
                {...register('name', { required: 'Name is required' })}
                id="name"
              ></TextField.Root>
            </FormGroup>
            <FormGroup error={errors.price?.message}>
              <label htmlFor="price">Price</label>
              <TextField.Root
                color={errors.price ? 'red' : 'green'}
                {...register('price', { required: 'Price is required' })}
                id="price"
                type="number"
              ></TextField.Root>
            </FormGroup>
          </Box>
          <Box>
            <FormGroup>
              <label htmlFor="description">Description</label>
              <TextArea {...register('description')} id="description"></TextArea>
            </FormGroup>
          </Box>
        </Grid>
        <div className="text-end">
          <Button type="submit" loading={isSubmitting}>
            Save
          </Button>
        </div>
      </Card>
    </form>
  );
};
