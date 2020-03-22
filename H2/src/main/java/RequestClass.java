package main.java;

public class RequestClass {

    private String source;
    private String destination;
    private String url;

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    @Override
    public String toString() {
        return "RequestClass{" +
                "source='" + source + '\'' +
                ", destination='" + destination + '\'' +
                ", url='" + url + '\'' +
                '}';
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
