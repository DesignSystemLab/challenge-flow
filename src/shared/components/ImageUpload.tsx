import { useId } from 'react';
import Image from 'next/image';
import styled from '@emotion/styled';
import { Button } from '@jdesignlab/react';
import { Loading } from '../components/Icons';
import { useImageUpload } from '../hooks/useImageUpload';
import { useEffect } from 'react';

interface Props {
  path?: string;
  alt?: string | null;
  src?: string;
  onImage?: (image: string) => void;
}

export const ImageUpload = (props: Props) => {
  const { onImage, path, alt, src } = props;
  const uploadPath = path || useId();
  const { mutate: uploadImage, isLoading, data: imageUrl = '' } = useImageUpload(uploadPath);

  useEffect(() => {
    if (onImage && imageUrl) {
      onImage(imageUrl);
    }
  }, [imageUrl]);

  const uploadPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file: File = e.target.files[0];
      uploadImage(file);
    }
  };

  return (
    <ImageWrap>
      <span css={{ backgroundColor: '#ededed' }}>
        <Image src={src || imageUrl} alt={alt || 'profile'} width={128} height={128} />
      </span>
      <Button variant="ghost" color="lightBlue-base" disabled={isLoading} icon={isLoading ? <Loading /> : undefined}>
        <label htmlFor="image-upload">이미지 업로드</label>
        <input onChange={uploadPhoto} id="image-upload" type="file" accept="image/*" />
      </Button>
    </ImageWrap>
  );
};

const ImageWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & span {
    font-size: 0;
    border: 1px solid #ffffff;
    border-radius: 50%;
  }
  & input[type='file'] {
    display: none;
  }

  & label {
    cursor: pointer;
  }
`;
