'use client'
import React from 'react';
import { Box, HStack, Button, Textarea } from '@chakra-ui/react';
import { useAioha } from '@aioha/react-ui'
import { useRef } from 'react';

export default function TweetComposer() {
    const { aioha, user, provider } = useAioha()
    const postBodyRef = useRef<HTMLTextAreaElement>(null);
    const [images, setImages] = useState<File[]>([]);
    const [selectedGif, setSelectedGif] = useState<IGif | null>(null);
    const [isGiphyModalOpen, setGiphyModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState<number[]>([]);

    async function handleComment() {
        //  console.log(process.env.NEXT_PUBLIC_THREAD_AUTHOR)
        //  console.log(aioha.getCurrentUser())
        const permlink = new Date()
            .toISOString()
            .replace(/[^a-zA-Z0-9]/g, "")
            .toLowerCase();

        let commentBody = postBodyRef.current?.value || '';

        if (images.length > 0) {
            const uploadedImages = await Promise.all(images.map(async (image, index) => {
                const signature = await getFileSignature(image);
                try {
                    const uploadUrl = await uploadImage(image, signature, index, setUploadProgress);
                    return uploadUrl;
                } catch (error) {
                    console.error('Error uploading image:', error);
                    return null;
                }
            }));

            const validUrls = uploadedImages.filter(Boolean);

            if (validUrls.length > 0) {
                const imageMarkup = validUrls.map((url: string | null) => `![image](${url?.toString() || ''})`).join('\n');
                commentBody += `\n\n${imageMarkup}`;
            }
        }

        if (selectedGif) {
            commentBody += `\n\n![gif](${selectedGif.images.downsized_medium.url})`;
        }

        if (commentBody) {
            const comment = await aioha.comment(
                String(process.env.NEXT_PUBLIC_THREAD_AUTHOR), 
                String(process.env.NEXT_PUBLIC_THREAD_PERMLINK),
                permlink, '', 
                commentBody, 
                { 
                    app: String(process.env.NEXT_PUBLIC_COMMUNITY_APP || "MyCommunity")
                    +'/'+String(process.env.NEXT_PUBLIC_COMMUNITY_VERSION || "0.0.1") 
                })
            console.log(comment)
        }
    }

    return (
        <Box bg="muted" p={4} borderRadius="base" mb={3}>
            <Textarea
                placeholder="What's happening?"
                bg="background"
                borderColor="border"
                borderRadius={'base'}
                mb={3}
                ref={postBodyRef}
                _placeholder={{ color: 'text' }}
                isDisabled={isLoading}
            />
            <HStack justify="space-between" mb={3}>
                <HStack>
                    <Button _hover={{ borderColor: 'border', border: '1px solid' }} _active={{ borderColor: 'border' }} as="label" variant="ghost" isDisabled={isLoading}>
                        <FaImage size={22} />
                        <ImageUploader images={images} onUpload={setImages} onRemove={(index) => setImages(prevImages => prevImages.filter((_, i) => i !== index))} />
                    </Button>
                    <Button _hover={{ borderColor: 'border', border: '1px solid' }} _active={{ borderColor: 'border' }} variant="ghost" onClick={() => setGiphyModalOpen(!isGiphyModalOpen)} isDisabled={isLoading}>
                        <MdGif size={48} />
                    </Button>
                </HStack>
                <Button variant="solid" colorScheme="primary" onClick={handleComment} isDisabled={isLoading}>
                    {isLoading ? <Spinner size="sm" /> : 'Tweet'}
                </Button>
            </HStack>
            <Wrap spacing={4}>
                {images.map((image, index) => (
                    <Box key={index} position="relative">
                        <Image alt="" src={URL.createObjectURL(image)} boxSize="100px" borderRadius="md" />
                        <IconButton
                            aria-label="Remove image"
                            icon={<CloseIcon />}
                            size="xs"
                            position="absolute"
                            top="0"
                            right="0"
                            onClick={() => setImages(prevImages => prevImages.filter((_, i) => i !== index))}
                            isDisabled={isLoading}
                        />
                        <Progress value={uploadProgress[index]} size="xs" colorScheme="green" mt={2} />
                    </Box>
                ))}
                {selectedGif && (
                    <Box key={selectedGif.id} position="relative">
                        <Image alt="" src={selectedGif.images.downsized_medium.url} boxSize="100px" borderRadius="md" />
                        <IconButton
                            aria-label="Remove GIF"
                            icon={<CloseIcon />}
                            size="xs"
                            position="absolute"
                            top="0"
                            right="0"
                            onClick={() => setSelectedGif(null)}
                            isDisabled={isLoading}
                        />
                    </Box>
                )}
            </Wrap>
            {isGiphyModalOpen && (
                <GiphySelector
                    apiKey={process.env.GIPHY_API_KEY || 'qXGQXTPKyNJByTFZpW7Kb0tEFeB90faV'}
                    onSelect={(gif, e) => {
                        e.preventDefault();
                        setSelectedGif(gif);
                        setGiphyModalOpen(false);
                    }}
                />
            )}
        </Box>
    );
};

export default TweetComposer; 
