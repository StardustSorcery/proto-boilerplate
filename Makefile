SHELL = /bin/bash
PROTO_FILES = $$(find proto -iname *.proto)

check:
	@\
	mkdir -p dist/python; \
	RESULT="$$(protoc --python_out=dist/python ${PROTO_FILES} 2>&1)"; \
	EXIT_CODE=$$?; \
	if [ $$EXIT_CODE -eq 1 ]; then \
		printf "\033[31mValidation Failed ------------------------\033[m\n"; \
		printf "$${RESULT}\n\033[31m------------------------------------------\033[m\n\n"; \
	else \
		printf "\033[32m[\xE2\x9C\x94] Validation Passed\033[m\n"; \
	fi; \
	rm -r dist/python; \
	exit $${EXIT_CODE};
