package edu.hubu.core.service;

import edu.hubu.core.config.MinioConfiguration;
import io.minio.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.core.io.buffer.DataBufferUtils;
import org.springframework.core.io.buffer.DefaultDataBufferFactory;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Component
public class FileService {

    private final MinioClient minioClient;

    private final String bucket;

    @Autowired
    public FileService(MinioConfiguration configuration) {
        bucket = configuration.getBucket();
        minioClient = MinioClient.builder()
                .endpoint(configuration.getEndpoint())
                .credentials(configuration.getAccessKey(), configuration.getSecretKey())
                .build();
        try {
            if (!minioClient.bucketExists(BucketExistsArgs.builder().bucket(bucket).build())) {
                minioClient.makeBucket(MakeBucketArgs.builder().bucket(bucket).build());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public Mono<String> upload(FilePart filePart, String folder, String fileName) {
        return DataBufferUtils.join(filePart.content())
                .map(dataBuffer -> {
                    try {
                        minioClient.putObject(PutObjectArgs.builder().bucket(bucket).object(folder + fileName)
                                .stream(dataBuffer.asInputStream(), dataBuffer.capacity(), -1).build());
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                    return fileName;
                }).onErrorStop();
    }

    public Flux<DataBuffer> download(String folder, String fileName) {
        return DataBufferUtils.readInputStream(
                () -> minioClient.getObject(GetObjectArgs.builder().bucket(bucket).object(folder + fileName).build()),
                new DefaultDataBufferFactory(), 4096);
    }
}
