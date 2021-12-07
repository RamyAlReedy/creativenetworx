var getDimensions = function (p1, p2) {
    return {
        width: Math.abs(p1.x - p2.x),
        height: Math.abs(p1.y - p2.y),
    }
};
var collisionCheck = function (node1, node2) {
  return node1.left < node2.left + node2.width &&
  node1.left + node1.width > node2.left &&
  node1.top < node2.top + node2.height &&
  node1.top + node1.height > node2.top;
};

Vue.component('drag-select', {
    template: `
    <div
      id="container"
      class="drag-select-container"
      ref="container"
      style="position: relative; user-select: none; touch-action: none;"
    >
        <div class="drag-select-inner fi-clearfix">
      <slot v-bind="{ selected: intersected }"></slot>
        </div>
    </div>
    `,
    props: {
      attribute: {
        type: String,
        required: true
      },
      columns: {
          type: [String,Number],
          required: false,
          default: 1,
      },
      color: {
        type: String,
        default: "#4299E1"
      },
      opacity: {
        type: Number,
        default: 0.7
      }
    },
    data: function () {
        return {
            intersected: [],
        }
    },
    watch: {
      intersected(i) {
        this.$emit("change", i);
      }
    },
    mounted: function () {
        const { container } = this.$refs;
        const self = this;
        let containerRect = container.getBoundingClientRect();
        const getCoords = e => ({
          x: e.clientX - containerRect.left,
          y: e.clientY - containerRect.top
        });
        let children;
        let box = document.createElement("div");
        box.setAttribute("data-drag-box-component", "");
        box.style.position = "absolute";
        box.style.backgroundColor = this.color;
        box.style.opacity = this.opacity;
        let start = { x: 0, y: 0 };
        let end = { x: 0, y: 0 };
        let ctrlKeyPressed = false;
        function intersection() {
          const rect = box.getBoundingClientRect();
          const intersected = [];
          for (let i = 0; i < children.length; i++) {
            if (collisionCheck(rect, children[i].getBoundingClientRect())) {
              const attr = children[i].getAttribute(self.attribute);
              if (children[i].hasAttribute(self.attribute) && !children[i].classList.contains('disabled')) {
                  //console.log(attr);
                intersected.push(attr);
              }
            }
          }
          if (
            JSON.stringify([...intersected]) !==
            JSON.stringify([...self.intersected])
          )
            self.intersected = intersected;
        }
        function touchStart(e) {
          e.preventDefault();
          startDrag(e.touches[0]);
        }
        function touchMove(e) {
          e.preventDefault();
          drag(e.touches[0]);
        }
        function startDrag(e) {
          containerRect = container.getBoundingClientRect();
          children = container.querySelector(".drag-select-inner").childNodes;
          start = getCoords(e);
          end = start;
          document.addEventListener("mousemove", drag);
          document.addEventListener("touchmove", touchMove);
          box.style.top = start.y + "px";
          box.style.left = start.x + "px";
          container.prepend(box);
          intersection();
        }
        function drag(e) {
          end = getCoords(e);
          const dimensions = getDimensions(start, end);
          if (end.x < start.x) {
            box.style.left = end.x + "px";
          }
          if (end.y < start.y) {
            box.style.top = end.y + "px";
          }
          box.style.width = dimensions.width + "px";
          box.style.height = dimensions.height + "px";
          intersection();
        }
        function endDrag() {
          start = { x: 0, y: 0 };
          end = { x: 0, y: 0 };
          box.style.width = 0;
          box.style.height = 0;
          document.removeEventListener("mousemove", drag);
          document.removeEventListener("touchmove", touchMove);
          box.remove();
        }
        container.addEventListener("mousedown", startDrag);
        container.addEventListener("touchstart", touchStart);
        document.addEventListener("mouseup", endDrag);
        document.addEventListener("touchend", endDrag);
        this.$once("on:destroy", () => {
          container.removeEventListener("mousedown", startDrag);
          container.removeEventListener("touchstart", touchStart);
          document.removeEventListener("mouseup", endDrag);
          document.removeEventListener("touchend", endDrag);
        });

        function containerSize() {
            var plate_container = jQuery(container).closest('.plate-container');
            jQuery(container).css({width: '', height: ''});
            jQuery(container).css({ width: plate_container.outerWidth(), height: plate_container.outerHeight()});

            if (jQuery('.tray-container').length) {
                jQuery('.tray-container .drag-select-inner').css({ width: self.columns * 70.8 });
            }
        }

        if (jQuery(container).is('.plate-container *')) {
            containerSize();

            jQuery(window).on('resize', function () {
                containerSize();
            });

            jQuery(document).on('change-tab', '.tab-content', function () {
                containerSize();
            });
        }
    },
});
