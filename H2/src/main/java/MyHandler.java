package main.java;

import com.amazonaws.auth.*;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.translate.AmazonTranslate;
import com.amazonaws.services.translate.AmazonTranslateClient;
import com.amazonaws.services.translate.model.TranslateTextRequest;
import com.amazonaws.services.translate.model.TranslateTextResult;
import com.amazonaws.AmazonServiceException;

import java.io.*;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

import org.jsoup.select.Elements;

import com.amazonaws.services.lambda.runtime.Context;

public class MyHandler {

    public static String main(String url, String source, String destination) throws InterruptedException {
        BasicAWSCredentials awsCreds = new BasicAWSCredentials("AKIATV74QBUBP2PVQEDU", "iyP/RlvylKFS8Wv2euEfNGG15CjfbyRRnB+7Ss+d");

        AwsClientBuilder.EndpointConfiguration endpointConfiguration = new AwsClientBuilder.EndpointConfiguration(
                "translate.us-east-2.amazonaws.com", "us-east-2");

        AmazonTranslate translate = AmazonTranslateClient.builder()
                .withCredentials(new AWSStaticCredentialsProvider(awsCreds))
                .withEndpointConfiguration(endpointConfiguration).build();
        System.out.println("created translate client");
        System.out.println("Translating URL: " + url);
        Document doc;

        try {
            doc = Jsoup.connect(url).get();
            Elements eles = doc.select("*");
            for (Element ele : eles) {
                translateElement(ele, translate, source, destination);
            }

            String fname = url.replace('.', '-').replace(":", "")
                    .replace("/", "-") + ".html";
            fname = "/tmp/" + fname;
            PrintWriter pw = new PrintWriter(fname, "UTF-8");

            Regions clientRegion = Regions.EU_WEST_1;
            String bucketName = "my-super-bucket-2020";
            AmazonS3 s3Client = AmazonS3ClientBuilder.standard()
                    .withRegion(clientRegion)
                    .build();

            pw.println(doc);
            pw.close();
            File file = new File(fname);
            s3Client.putObject(bucketName, fname, file);
            System.out.println("Saved file " + fname);
            return fname;

        } catch (IOException e1) {
            e1.printStackTrace();
        }
        return "";
    }

    public static void translateElement(Element ele, AmazonTranslate translate, String source, String destination) {
        if (!ele.ownText().isEmpty()) {
            String text = ele.ownText();
            try {
                TranslateTextRequest request = new TranslateTextRequest()
                        .withText(text)
                        .withSourceLanguageCode(source)
                        .withTargetLanguageCode(destination);
                TranslateTextResult result = translate.translateText(request);
                System.out.println("Original text: " + text + " - Translated text: " + result.getTranslatedText());
                ele.text(result.getTranslatedText());
            } catch (AmazonServiceException e) {
                System.err.println(e.getErrorMessage());
                System.exit(1);
            }
        }
    }

    public void handleRequest(InputStream inputStream, OutputStream outputStream, Context context) {
        final ObjectMapper objectMapper = new ObjectMapper();
        JsonNode json = null;
        try {
            json = objectMapper.readTree(inputStream);
        } catch (IOException e) {
            e.printStackTrace();
        }

        if (json.path("body") != null) {
            try {
                json = objectMapper.readTree(json.path("body").asText());
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        String result = "";
        try {
            result = main(json.get("url").asText(), json.get("source").asText(), json.get("destination").asText());
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        ResponseClass responseClass = new ResponseClass();
        Body body = new Body();
        result = "https://my-super-bucket-2020.s3-eu-west-1.amazonaws.com/" + result;
        body.setS3_path(result);
        responseClass.setBody(result);
        responseClass.setStatusCode(200);
        responseClass.setBase64Encoded(false);
        responseClass.setHeaders(new Headers());

        try {
            String response = objectMapper.writeValueAsString(responseClass);
            System.out.println("response is:");
            System.out.println(response);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        System.out.println(result);
        try {
            objectMapper.writeValue(outputStream, responseClass);
            outputStream.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

