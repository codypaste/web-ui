IMAGE_TAG ?= latest

start:
	ng serve

build-ng:
	ng build --aot --prod --optimization --service-worker

build-image:
	docker build -t 140303875034.dkr.ecr.eu-west-1.amazonaws.com/codypaste-ui:$(IMAGE_TAG) .

build: build-ng build-image

push-image:
	docker push 140303875034.dkr.ecr.eu-west-1.amazonaws.com/codypaste-ui:$(IMAGE_TAG)

get-login:
	aws ecr get-login --no-include-email --region eu-west-1

.PHONY: get-login build build-image push-image
